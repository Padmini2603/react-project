import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import Header from './Header';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/explore');
  };


  const trendingImages = [
    'https://images.unsplash.com/photo-1521747116042-5a810fda9664',
    'https://images.unsplash.com/photo-1521747116042-5a810fda9664',
    'https://images.unsplash.com/photo-1521747116042-5a810fda9664',
    'https://images.unsplash.com/photo-1521747116042-5a810fda9664',
    'https://images.unsplash.com/photo-1521747116042-5a810fda9664',
    'https://images.unsplash.com/photo-1521747116042-5a810fda9664',
    'https://images.unsplash.com/photo-1521747116042-5a810fda9664',
    'https://images.unsplash.com/photo-1521747116042-5a810fda9664',
  ];

  return (
    <div className="dashboard">
      <Header />
      <div className="banner">
        <img alt="Banner" src='https://images.unsplash.com/photo-1521747116042-5a810fda9664'  className="banner-image" />
        <button className="explore-btn" onClick={handleExploreClick}>
          Shop
        </button>
      </div>
      <div className="content">
        <h1>Welcome to FashionEra's official website</h1>
        <p>Ultimate fashion spot for all your needs</p>
      </div>
      <div className='trending'>
        <h3>Trending Now</h3>
        <div className="trending-images">
          {trendingImages.map((image, index) => (
            <div key={index} className="image-item">
              <img src={image} alt={`Trending ${index + 1}`} className="trending-image" />
              <button className="shop-btn" onClick={handleExploreClick}>
                Shop
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className='about'>
        <h2>What we do here?</h2>
        <p>We bring the latest trends straight to your wardrobe, making style effortless and timeless.</p>
      </div>
    </div>
  );
};

export default Dashboard;
