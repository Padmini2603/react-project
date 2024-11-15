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
    'https://images.unsplash.com/photo-1603994237900-d69d0e035f2d',
    'https://images.unsplash.com/photo-1603191603153-8e34b35e118d',
    'https://images.unsplash.com/photo-1501594907352-717054f34da0',
    'https://images.unsplash.com/photo-1551866829-2201b25ea888',
    'https://images.unsplash.com/photo-1605367306753-d75a87f5d7f6',
    'https://images.unsplash.com/photo-1604600968048-9a5cf76e17da',
    'https://images.unsplash.com/photo-1600785975763-7a8dbad61cc5',
    'https://images.unsplash.com/photo-1612369060003-3b3b4bc344fa',
    'https://images.unsplash.com/photo-1586198250726-5e2c6b2b74fe',
    'https://images.unsplash.com/photo-1566852954-7137cf2837c0',
    'https://images.unsplash.com/photo-1557427797-d78eaf12c282',
  ];

  return (
    <div className="dashboard">
      <Header />
      <div className="banner">
        <img alt="Banner" className="banner-image" />
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
