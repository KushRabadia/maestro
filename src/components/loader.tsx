import 'react-multi-carousel/lib/styles.css';
import CircularProgress from '@mui/material/CircularProgress';

interface LoaderProps {
  replaceIcon?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ replaceIcon }) => {
  return (
    <div className="margin-md loader_circle">
      {replaceIcon ? <CircularProgress className="circular_progress" size={25} /> : <CircularProgress />}
    </div>
  );
};

export default Loader;
