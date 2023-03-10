class Task < ApplicationRecord
  enum priority: { low: 0, medium: 1, high: 2 }
  enum status: {
         Rejected: 0,
         Unstarted: 1,
         Start: 2,
         Finish: 3,
         Deliver: 4,
         Accept: 5,
         Completed: 6,
         Reject: 7
       }

  #
  belongs_to :list
  belongs_to :task_section, optional: true
  has_many :task_owners
  has_many :user_owners,
           through: :task_owners, source: :task_ownerable, source_type: 'User'
  has_many :team_owners,
           through: :task_owners, source: :task_ownerable, source_type: 'Team'

  has_many :task_messages

  has_many :file_version_tasks
  has_many :file_versions, through: :file_version_tasks

  def self.import(files)
    require 'roo'

    tasks = {}
    files.each_with_index do |file, index|
      spreadsheet = Roo::Spreadsheet.open(file.path)
      header = spreadsheet.row(1).map(&:downcase!)

      tasks_data =
        (2..spreadsheet.last_row).each_with_object({}) do |i, tasks|
          row = Hash[[header, spreadsheet.row(i)].transpose]
          row['name'] = row.delete('task')

          priority = row['priority']&.downcase!

          if priority
            case priority[0]
            when 'h'
              row['priority'] = 'high'
            when 'm'
              row['priority'] = 'medium'
            when 'l'
              row['priority'] = 'low'
            else
              row['priority'] = 'medium'
            end
          end
          tasks[i - 1] = row
        end
      tasks[index + 1] = tasks_data
    end
    tasks
  end
end
