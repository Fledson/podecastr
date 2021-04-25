// convertendo duração de segundos para hora minuto e segundos

export function convertDurationToTimeString(duration){
  const hours = Math.floor(duration / 3600);// => pegando o menor numero da divisão 
  const minutes = Math.floor((duration % 3600) / 60); // => resto da divisão do calculo acima e dividindo por 60
  const seconds = Math.floor(duration % 60);

  const timeString = [hours, minutes, seconds]
    .map(unit => String(unit).padStart(2, "0"))
    .join(":");
  
  return timeString;
   
}