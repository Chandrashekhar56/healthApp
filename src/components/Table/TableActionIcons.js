import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import LoopIcon from '@mui/icons-material/Loop';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import palette from 'src/theme/palette';
import FaxOutlinedIcon from '@mui/icons-material/FaxOutlined';
import LocalPharmacyOutlinedIcon from '@mui/icons-material/LocalPharmacyOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';

const TableActionIcons = (type) => {
  switch (type) {
    case 'delete':
      return (
        <Delete
          size="small"
          sx={{ width: '18px', height: '18px', color: palette.common.icon }}
        />
      );
    case 'edit':
      return (
        <Edit
          size="small"
          sx={{ width: '18px', height: '18px', color: palette.common.icon }}
        />
      );
      case 'share':
      return (
        <ShareIcon
          size="small"
          sx={{ width: '18px', height: '18px', color: palette.common.icon }}
        />
      );
      case 'fax':
      return (
        <FaxOutlinedIcon
          size="small"
          sx={{ width: '18px', height: '18px', color: palette.primary.main }}
        />
      );
      case 'pharmacyOrder':
        return (
          <LocalPharmacyOutlinedIcon
            size="small"
            sx={{ width: '18px', height: '18px', color: palette.primary.main }}
          />
        );
        case 'ship':
          return (
            <LocalShippingOutlinedIcon
              size="small"
              sx={{ width: '18px', height: '18px', color: palette.primary.main }}
            />
          );
      case 'print':
        return (
          <PrintOutlinedIcon
            size="small"
            sx={{ width: '18px', height: '18px', color: palette.primary.main }}
          />
        );
        case 'regenerate':
          return (
            <LoopIcon
              size="small"
              sx={{ width: '18px', height: '18px', color: palette.primary.main }}
            />
          );
    case 'download':
      return (
        <img
          width="18px"
          height="18px"
          alt={type}
          src="/assets/icons/ic_download.svg"
        />
      );
    default:
      return <div />;
  }
};

export default TableActionIcons;
