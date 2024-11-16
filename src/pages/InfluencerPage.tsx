import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppContainer from '../App.tsx'
import InfluencerDetails from '../components/InfluencerDetails.tsx';
import InfluencerData from '../model/InfluencerData';

const influencer: InfluencerData = {
    "influencerId":"unique_id_per_influencer-can be uuid",
    "firstName":"Garrett",
    "lastName":"Hoobastank",
    "starRating":4.71,
    "popularMediaHandles":[
        {"platform":"instagram",
        "handle":"bananbreadfred"},
        {"platform":"x",
        "handle":"bananbreadfred"}
    ],
    "otherMediaHandles":[
        {
            "platform":"tumblr",
            "handle":"a_tumbler_account"
        }
    ],
    "contact": "email@email.com",
    // "listOfPosts":[
    //     "20347394723",
    //     "w234342jlkjf",
    //     "post_id_numbers"
    // ],
    "tags":[
        "cooking",
        "sports",
        "asian",
        "humor",
        "humour"
    ],
    "numberOfReviews": 7
}

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <AppContainer ComponentProp={<InfluencerDetails influencer={influencer} />}/>
  </StrictMode>,
)