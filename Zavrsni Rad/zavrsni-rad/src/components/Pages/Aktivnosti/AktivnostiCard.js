const AktivnostiCard = ({naslov, text, image}) => {
  return (
    <div className='aktivnostiCard'>
        <h2>{naslov}</h2>
        <p>{text}</p>
        <img alt='Activity Image' title='Activity Image' width={"auto"} height={"auto"} src={image}></img>
    </div>
  )
}

export default AktivnostiCard
