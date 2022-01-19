import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import TranslationInput from './TranslationInput';
import TextBody from './Body-Paragraph';
import wordsService from '../../services/words';
import textsService from '../../services/texts';
import {
  userwordsState,
  currenttextState,
  userState,
} from '../../states/recoil-states';
import getToken from '../../utils/getToken';
import NotFound from '../NotFound';

const demoText = {
  title: 'La niña de los fósforos',
  body: `¡Qué frío hacía!; nevaba y comenzaba a oscurecer; era la última noche del año, la noche de San Silvestre. Bajo aquel frío y en aquella oscuridad, pasaba por la calle una pobre niña, descalza y con la cabeza descubierta. Verdad es que al salir de su casa llevaba zapatillas, pero, ¡de qué le sirvieron! Eran unas zapatillas que su madre había llevado últimamente, y a la pequeña le venían tan grandes, que las perdió al cruzar corriendo la calle para librarse de dos coches que venían a toda velocidad. Una de las zapatillas no hubo medio de encontrarla, y la otra se la había puesto un mozalbete, que dijo que la haría servir de cuna el día que tuviese hijos.
  Y así la pobrecilla andaba descalza con los desnudos piececitos completamente amoratados por el frío. En un viejo delantal llevaba un puñado de fósforos, y un paquete en una mano. En todo el santo día nadie le había comprado nada, ni le había dado un mísero chelín; volvíase a su casa hambrienta y medio helada, ¡y parecía tan abatida, la pobrecilla! Los copos de nieve caían sobre su largo cabello rubio, cuyos hermosos rizos le cubrían el cuello; pero no estaba ella para presumir.
  En un ángulo que formaban dos casas -una más saliente que la otra-, se sentó en el suelo y se acurrucó hecha un ovillo. Encogía los piececitos todo lo posible, pero el frío la iba invadiendo, y, por otra parte, no se atrevía a volver a casa, pues no había vendido ni un fósforo, ni recogido un triste céntimo. Su padre le pegaría, además de que en casa hacía frío también; sólo los cobijaba el tejado, y el viento entraba por todas partes, pese a la paja y los trapos con que habían procurado tapar las rendijas.`,
};

const SingleText = function () {
  const [currentText, setCurrentText] = useRecoilState(currenttextState);
  const setUserWords = useSetRecoilState(userwordsState);
  const user = useRecoilValue(userState);
  const params = useParams();
  const [error, setError] = useState('');
  const location = useLocation();
  const voices = window.speechSynthesis.getVoices();

  const fetchUserwords = async function() {
    if (currentText && user) {
      const userWordsResponse = await wordsService
        .getUserwordsInText(String(currentText.id), user.knownLanguageId);
      setUserWords(userWordsResponse);
    }
  };

  const fetchTextAndUserwords = async function() {
    if (params.textId && getToken()) {
      try {
        const text = await textsService.getTextById(params.textId);
        setCurrentText(text);
        fetchUserwords();
      } catch (e) {
        setError('error');
      }
    }
  };

  useEffect(() => {
    if (currentText) {
      fetchUserwords();
    } else {
      fetchTextAndUserwords();
    }
  }, [currentText, user]);

  if (currentText && Number(currentText.id) === Number(params.textId)) {
    return (
      <div key={`text-id:${currentText.id}outer`} className='bg-secondary mx-auto max-w-7xl lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-[1fr, 400px] md:gap-8 my-8 lg:grid-flow-col-dense'>
          <TextBody key={`text-id:${currentText.id}unique`} title={currentText.title} textBody={`${currentText.title}. \n${currentText.body}`} />
          <TranslationInput voices={voices} />
        </div>
      </div>
    );
  }

  if (location.pathname === '/demo') {
    return (
      <main className='container mx-auto mb-auto'>
        <div className='bg-secondary mx-auto max-w-7xl lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-[1fr, 400px] md:gap-8 my-8 lg:grid-flow-col-dense'>
            <TextBody title={demoText.title} textBody={`${demoText.title}. \n${demoText.body}`} />
            <TranslationInput voices={voices} />
          </div>
        </div>
        </main>
    );
  }

  if (error === 'error') {
    return (
      <div className='Text-page'>
        <NotFound />
      </div>
    );
  }

  return (
    <div className='Text-page'>
    </div>
  );
};

export default SingleText;
