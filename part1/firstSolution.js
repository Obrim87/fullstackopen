// Just saving this because it took me ages to figure out and was my first real React challenge

export function getImageUrl(imageId, size = 's') {
  return (
    'https://i.imgur.com/' +
    imageId +
    size +
    '.jpg'
  );
}

function Profile({ name, imageID, profession, awards, discovered }) {
  let string = '';
  for(let i of awards) {
    string += `${i}, `
  }
  return (
    <section className="profile">
      <h2>{name}</h2>
      <img
        className="avatar"
        src={getImageUrl(imageID)}
        alt="{name}"
        width={70}
        height={70}
      />
      <ul>
        <li>
          <b>Profession: </b> 
          {profession}
        </li>
        <li>
          <b>Awards - {awards.length}: </b> 
          {string}
        </li>
        <li>
          <b>Discovered: </b>
          {discovered}
        </li>
      </ul>
    </section>
  )
}

export default function Gallery() {
  return (
    <div>
      <h1>Notable Scientists</h1>     
      <Profile            
        name='Maria Skłodowska-Curie'
        imageID='szV5sdG'
        profession='physicist and chemist'
        awards={[
          'Nobel Prize in Physics',
          'Nobel Prize in Chemistry',
          'Davy Medal',
          'Matteucci Medal'
        ]}
        discovered='polonium (element)'
      />
      <Profile            
        name='Katsuko Saruhashi'
        imageID='YfeOqp2'
        profession='geochemist'
        awards={[
          'Miyake Prize for geochemistry',
          'Tanaka Prize'
        ]}
        discovered='a method for measuring carbon dioxide in seawater'
      />
    </div>
  );
}