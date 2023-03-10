import {withStyles} from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';

const StyledTableRow = withStyles({
  root: {
    padding: '0px 24px 0px 24px',
    fontFamily: 'Montserrat',
    fontWeight: 600,
    fontSize: '12px',
    color: '#606060',
    '&$selected, &$hover:hover': {
      color: '#FFFFFF',
      background: '#EBF2FF',
    },
  },
  selected: {},
  hover: {},
})(TableRow);

export default StyledTableRow;
