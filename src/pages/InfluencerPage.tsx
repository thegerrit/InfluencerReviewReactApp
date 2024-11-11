import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppContainer from '../App.tsx'
import InfluencerDetails,{InfluencerData} from '../components/InfluencerDetails.tsx';
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
    "listOfPosts":[
        "20347394723",
        "w234342jlkjf",
        "post_id_numbers"
    ],
    "tags":[
        "cooking",
        "sports",
        "asian",
        "humor",
        "humour"
    ]
}

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <AppContainer ComponentProp={<InfluencerDetails influencer={influencer} />}/>
  </StrictMode>,
)