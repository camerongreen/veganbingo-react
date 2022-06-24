import * as React from 'react';
import HelpCenterIcon from '@mui/icons-material/HelpCenter'
import InfoPage from './InfoPage';

export default function Help() {
  return (
    <InfoPage icon={<HelpCenterIcon fontSize="large"/>} heading="How to play">
      <p>
        You start with a the board of pictures/icons, each one representing
        things people commonly say to vegans.
      </p>

      <p>
        When someone says one of them to you, you then say Vegan Bingo! You
        go and click on its icon and press the button to say you've
        completed it. A red X will now appear on the screen for that item
        showing it as checked off, and your score will go up (yay!).
      </p>

      <p>
        Your aim is to have enough conversations about veganism with people
        that you get to check off all of the squares. You get kudos, and at
        parties will be able to use the only known infallible pick-up line,
        "I completed Vegan Bingo".
      </p>

      <p>
        You can't do anything wrong, you can just go to settings and click
        restart at any time. So start tapping/clicking each of the icons to
        see what they represent and read some more info.
      </p>

      <p>
        As vegans we may get bored of the same questions, but it's worth
        remembering that veganism was new to all of us at some point. So
        enjoy the game and be kind to all animals, humans included.
      </p>
    </InfoPage>
  );
}
