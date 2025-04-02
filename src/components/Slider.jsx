import React, { useState, useEffect, useCallback } from 'react';
import "./Slider.css";

const Slider = ({ imagens, autoplayTime = 2000, showArrows = true, showDots = true }) => {
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Avançar slide
  const avancarSlide = useCallback(() => {
    if (imagens && imagens.length > 0) {
      setIndiceAtual((prev) => (prev + 1) % imagens.length);
    }
  }, [imagens]);

  // Voltar slide
  const voltarSlide = useCallback(() => {
    if (imagens && imagens.length > 0) {
      setIndiceAtual((prev) => (prev - 1 + imagens.length) % imagens.length);
    }
  }, [imagens]);

  // Navegação pelo teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') voltarSlide();
      if (e.key === 'ArrowRight') avancarSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [voltarSlide, avancarSlide]);

  // Troca automática de imagem
  useEffect(() => {
    if (!isHovering && imagens && imagens.length > 1) {
      const intervalo = setInterval(avancarSlide, autoplayTime);
      return () => clearInterval(intervalo);
    }
    return undefined;
  }, [avancarSlide, isHovering, imagens, autoplayTime]);

  // Manipulação de eventos de toque para swipe em dispositivos móveis
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // swipe esquerda
      avancarSlide();
    }

    if (touchStart - touchEnd < -50) {
      // swipe direita
      voltarSlide();
    }
  };

  // Verifica se há imagens
  if (!imagens || imagens.length === 0) {
    return <div className="carousel carousel-empty">Nenhuma imagem disponível</div>;
  }

  return (
    <div 
      className="carousel"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="carousel-inner">
        {imagens.map((imagem, idx) => (
          <div 
            key={idx} 
            className={`slide-container ${idx === indiceAtual ? "active" : ""}`}
            style={{ transform: `translateX(${(idx - indiceAtual) * 100}%)` }}
          >
            <a 
              href={imagem.link || "#"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="slide-link"
              aria-label={imagem.alt || `Slide ${idx + 1}`}
            >
              <img 
                src={imagem.url} 
                alt={imagem.alt || `Slide ${idx + 1}`} 
                className="slide" 
                loading={idx === 0 ? "eager" : "lazy"}
              />
              {imagem.caption && (
                <div className="slide-caption">
                  <p>{imagem.caption}</p>
                </div>
              )}
            </a>
          </div>
        ))}
      </div>

      {showArrows && imagens.length > 1 && (
        <>
          <button 
            className="seta esquerda" 
            onClick={voltarSlide}
            aria-label="Slide anterior"
          >
            <span className="seta-icon">&#10094;</span>
          </button>
          <button 
            className="seta direita" 
            onClick={avancarSlide}
            aria-label="Próximo slide"
          >
            <span className="seta-icon">&#10095;</span>
          </button>
        </>
      )}

      {showDots && imagens.length > 1 && (
        <div className="indicadores">
          {imagens.map((_, idx) => (
            <button
              key={idx}
              className={`indicador ${idx === indiceAtual ? "ativo" : ""}`}
              onClick={() => setIndiceAtual(idx)}
              aria-label={`Ir para slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Slider;