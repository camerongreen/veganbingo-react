import * as React from 'react';
import InfoIcon from '@mui/icons-material/Info';
import InfoPage from './InfoPage';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

export default function Book() {
  return (
    <InfoPage icon={<InfoIcon fontSize="large"/>}
              heading="Vegan Bingo! The Book">
      <p>
        To make it easier to read all the answers here, you can read <strong>Vegan
        Bingo! The Book</strong>.
      </p>
      <p>
        Generally to import a book to your e-reader, you can plug your e-reader in to your computer with a cable, go into your file explorer where the device should display. Then just download and drag one of the files below onto it and then safely eject it. There may also ways to send things to your device if you check online.
      </p>
      <p>
        <MenuBookIcon/> <a target="_blank"
        href="/files/Cameron%20Green/Vegan%20Bingo%21%20The%20Book/Vegan%20Bingo%21%20The%20Book%20-%20Cameron%20Green.mobi">
        Download Mobi version for <strong>Kindle</strong></a>.
      </p>
      <p>
        <MenuBookIcon/> <a target="_blank"
        href="/files/Cameron%20Green/Vegan%20Bingo%21%20The%20Book/Vegan%20Bingo%21%20The%20Book%20-%20Cameron%20Green.epub">
        Download Epub version for <strong>Kobo, Calibre and other
        ereaders</strong></a>.
      </p>
      <p>
        <PictureAsPdfIcon/> <a target="_blank"
        href="/files/Cameron%20Green/Vegan%20Bingo%21%20The%20Book/Vegan%20Bingo%21%20The%20Book%20-%20Cameron%20Green.pdf">
        Download PDF version for <strong>everything else</strong></a>.
      </p>
    </InfoPage>
  );
}
