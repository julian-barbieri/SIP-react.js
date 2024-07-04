export default function distanciaEntrePuntos(entradax, entraday, gondolax, gondolay){
    const dx = entradax - gondolax
    const dy = entraday - gondolay
    const distancia = 10 * Math.sqrt((dx ** 2) / 100 + (dy ** 2) / 100);
    return distancia;
}