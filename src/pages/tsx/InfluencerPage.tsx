import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppContainer from '../../utils/AppContainer.tsx'
import InfluencerDetails from '../../components/InfluencerDetails.tsx';
import ReadInfluencerData from '../../model/ReadInfluencerData.tsx';
import GetInfluencerById from '../../dataApi/GetInfluencerById.tsx';
// import Review from '../../model/Review.tsx';
// import GetReviewsByInfluencerId from '../../dataApi/GetReviewsByInfluencerId.tsx';

import { useEffect, useState } from 'react';
import Loading from '../../components/Loading.tsx';

const InfluencerPage: React.FC = () => {
  const [influencer, setInfluencer] = useState<ReadInfluencerData | null>(null);
  // const [reviews, setReviews] = useState<Review[]>([]);
  const [_influencerId, set_InfluencerId] = useState<string>('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const fetchInfluencer = async () => {
      
      if (id) {
        const fetchedInfluencer = await GetInfluencerById(id);
        setInfluencer(fetchedInfluencer);
        set_InfluencerId(id);
      }
    };

    // const fetchReviews = async () => {
    //   if (id) {
    //     const fetchedReviews = await GetReviewsByInfluencerId(id);
    //     setReviews(fetchedReviews);
    //   }
    // };

    fetchInfluencer();
    // fetchReviews();
  }, []);

  if (!influencer) {
    return <Loading />;
  }

  return (
    <StrictMode>
      <AppContainer ComponentProp={<InfluencerDetails influencerId={_influencerId} influencer={influencer}/>} />
    </StrictMode>
  );
};

createRoot(document.getElementById('root')!).render(<InfluencerPage />);