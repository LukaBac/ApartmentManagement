import './Aktivnosti.css';
import AktivnostiCard from './AktivnostiCard';

import Dubrovnik from '../../../img/dubrovnik.jpg';
import Pula from '../../../img/Pula.jpg';
import Rijeka from '../../../img/Rijeka.jpg';
import Split from '../../../img/Split.jpg';
import Zadar from '../../../img/Zadar.jpg';
import Zagreb from '../../../img/Zagreb.jpg';


const Aktivnosti = () => {
    const activities = [
        {
            "naslov": "Dubrovnik",
            "tekst": "Dubrovnik, biser Jadrana, nudi prekrasne zidine, Stradun, te plaže poput Banje. Posjetitelji mogu uživati u povijesnim znamenitostima, vožnji žičarom do Srđa, te istraživanju otoka Lokrum.",
            "slika": Dubrovnik
        },
        {
            "naslov": "Split",
            "tekst": "Split, grad pod zaštitom UNESCO-a, poznat je po Dioklecijanovoj palači, Rivi i Marjanu. Posjetitelji mogu istraživati povijesne znamenitosti, uživati u lokalnoj gastronomiji i sunčati se na plaži Bačvice.",
            "slika": Split
        },
        {
            "naslov": "Zadar",
            "tekst": "Zadar je poznat po Morskim orguljama i Pozdravu Suncu. Grad nudi bogatu povijest, crkvu sv. Donata, te brojne muzeje. Uživajte u zalascima sunca i istraživanju obližnjih otoka.",
            "slika": Zadar
        },
        {
          "naslov": "Rijeka",
          "tekst": "Rijeka, najveća hrvatska luka, nudi zanimljive muzeje, Trsat i prekrasne plaže. Posjetitelji mogu uživati u bogatom kulturnom životu, kafićima i restoranima, te istraživanju okolnih prirodnih ljepota.",
          "slika": Rijeka
        },

        {
          "naslov": "Pula",
          "tekst": "Pula je poznata po svom amfiteatru, jednom od najbolje očuvanih rimskih koloseuma. Posjetitelji mogu istraživati povijesne znamenitosti, posjetiti Brijune, te uživati u lokalnoj kuhinji i vinima.",
          "slika": Pula
        },

        {
          "naslov": "Zagreb",
          "tekst": "Zagreb, glavni grad Hrvatske, nudi bogat kulturni život, muzeje, galerije, te prekrasne parkove. Posjetitelji mogu uživati u šetnjama Gornjim gradom, posjetiti Dolac tržnicu i istraživati zanimljive gradske četvrti.",
          "slika": Zagreb
        }
    ]


  return (
    <div className='AktivnostiPage'>
        <div className='AktivnostiMainInfo'>
          <h1>Aktivnosti</h1>
          <h2>Neke aktivnosti koje možete raditi u Hrvatskoj</h2>
          <p>Hrvatska je puna poznatih turističkih odredišta <br></br>Istražite neke od njih koristeći naše apartmane za maksimalnu udobnost tijekom vašeg putovanja. <br></br>Ispod imamo opis nekih od najpoznatijih gradova u kojima imamo smještajne jedinice</p>
        </div>

        <div className='aktivnostiCards'>
            {activities.map((data) =>(
                <AktivnostiCard naslov={data.naslov} text={data.tekst} image={data.slika}/>
            ))}
        </div>
    </div>
  )
}

export default Aktivnosti
