import * as React from 'react';
import Image from 'mui-image';
import InfoIcon from '@mui/icons-material/Info';
import InfoPage from './InfoPage';

export default function About() {
 return (
   <InfoPage icon={<InfoIcon fontSize="large"/>} heading="About Vegan Bingo">
     <p>
       Greetings!
     </p>

     <p>Anyone who has been vegan for a long time will have witnessed an incredible amount of positive change. While veganism has never been more mainstream, it is still relatively niche as part of the general population. A lot of people don’t know much about veganism, and as a vegan you will often be asked the same questions repeatedly. Vegan Bingo is a way to have fun with this reality, and reward you for having conversations about veganism. You check off a bingo when people ask questions, and can track how long it takes you to get them all.
     </p>

     <p>Personally I’ve been through various stages with this reality of the same conversations over and over again. As a new vegan I was full of hope and energy, I thought that we just needed to reach people with the reality of animal suffering and sentience and they would see the same truth I had. This was inevitably followed by disillusionment with the fact that people didn’t have any good argument for eating animals, but didn’t care that they didn’t. Any poor argument refutable by two minutes on the internet would do, they can’t be bothered to change and wish you wouldn’t remind them of the billions of animals needlessly suffering they are directly contributing to. I wanted to say to people “Don’t ask me where I get my protein from if you don’t care about my answer and are just clumsily trying to justify your own apathy and inaction towards animal suffering”. I’ve now come to what I think is a healthier and more productive state. People asking me questions, even stupid loaded questions, is an invitation to advocate for the animals. I try to enter the conversations lightly, sincerely, keeping in mind that at some point all ideas are new to everybody, that there is something to learn from most people, that I ate meat for the first 25 years of my life and might have said the same things, that even though I have heard the same questions dozens of times each person who asks it has their own unique story, that I probably won’t convert anyone in a single conversation but it’s achievable to remove one or two of their barriers to change, and that most of all I don’t want to leave a bad experience of conversing about veganism in someone’s mind, or the minds of people witnessing the conversation. I want to leave people as, or more, open to discussing veganism as when I found them.
     </p>

     <p>Vegan Bingo also gives vegans some ideas for how to answer common questions. We shouldn't pretend we have all the answers, hopefully the person you are talking to is just another person trying to figure out how to live well and ethically in this world just like we are. Some people are just arguing out of ego, they resist change because they don’t really have ideals, just an identity to cling to and try to elevate. Others though, who argue just as rigorously and usually more perceptively, do so because they want proof of a position before they consider adopting it. People don’t change lightly after all, nor should they, we should accept and even encourage that and think of our jobs as planting seeds, of helping people see a truth which they will come to be thankful for.
     </p>

     <p>
       If you'd like to get in touch about Vegan Bingo or anything else, or just
       want to read my thoughts, check out my web page at: <a
       href="https://camerongreen.org" target="_blank">camerongreen.org</a>
     </p>

     <p>
       You can chat more about Vegan Bingo, post your times, watch tumble weeds
       roll past (seriously there have been like 2 posts ever) at: <a
       href="https://facebook.com/veganbingo"
       target="_blank">facebook.com/veganbingo</a>
     </p>

     <p>
       To read the privacy terms or other FAQs about the app: <a
       href="https://camerongreen.org/a/veganbingo" target="_blank">Vegan Bingo
       on E.A.R.T.H.</a>. In short it only stores data in a cookie and I don't take any identifying information. I have put Google Analytics on it now, but I won't be using it to target ads or anything else, just want to know how many people are using it.
     </p>

     <p>
       Vegan Bingo was inspired by (what I think is) the original Omnivore
       Rationalization Bingo by Vegnews, sent to me in 2008.
       <Image sx={{ margin: '1rem auto', 'max-width': '80%' }} showLoading src="images/rationalization-bingo-2007.jpg" alt="Omnivore Rationalization Bingo" />
     </p>

     <p>
       This work is licensed under the Creative Commons
       Attribution-NonCommercial-ShareAlike 3.0 Unported License. To view a
       copy of this licence, visit <a
       href="http://creativecommons.org/licenses/by-nc-sa/3.0/"
       target="_blank">Creative Commons</a>. Source code for the application is here: <a
       href="https://github.com/camerongreen/veganbingo-react">Vegan Bingo on Github</a>.
     </p>

     <p>Ahimsa!</p>

   </InfoPage>
 );
}
