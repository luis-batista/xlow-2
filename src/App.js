import styles from './App.module.css';
import Slider from './components/Slider';

const arrayImagens = [
    {
        url: 'https://picsum.photos/id/93/900/700',
        alt: 'campo de flores de petalas brancas abaixo do ceu nublado',
        link: 'https://unsplash.com/pt-br/fotografias/campo-de-flores-de-petalas-brancas-abaixo-do-ceu-nublado-r1XwWjI4PyE'
    },
    {
        url: 'https://picsum.photos/id/117/900/700',
        alt: 'fotografia da silhueta do grupo de pessoas no concerto',
        link: 'https://unsplash.com/pt-br/fotografias/fotografia-da-silhueta-do-grupo-de-pessoas-no-concerto-Q14J2k8VE3U'
    },
    {
        url: 'https://picsum.photos/id/95/900/700',
        alt: 'arvores nuas com nevoeiros',
        link: 'https://unsplash.com/pt-br/fotografias/arvores-nuas-com-nevoeiros-87TJNWkepvI'
    },
    {
        url: 'https://picsum.photos/id/103/900/700',
        alt: 'pessoa usando sapatos azuis e brancos converse all star enquanto esta sentada na grama marrom durante o dia',
        link: 'https://unsplash.com/pt-br/fotografias/pessoa-usando-sapatos-azuis-e-brancos-converse-all-star-enquanto-esta-sentada-na-grama-marrom-durante-o-dia-DwTZwZYi9Ww'
    },
    {
        url: 'https://picsum.photos/id/111/900/700',
        alt: 'foto com pouca luz do carro classico',
        link: 'https://unsplash.com/pt-br/fotografias/foto-com-pouca-luz-do-carro-classico-eLUegVAjN7s'
    },
];

function App() {
  return (
    <div className={styles.carouselContainer}>
      <Slider imagens={arrayImagens} />
    </div>
  );
}

export default App;