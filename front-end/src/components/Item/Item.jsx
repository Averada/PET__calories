import { CardImg } from 'reactstrap';

function Item({ image, Kcals, proteins, fats, carbs }) {
  return (
    <div style={{paddingTop:"12px"}}>
      <CardImg style={{ width: '12%' }} src={image} alt="food image" />
      <span style={{ fontWeight: 'bold', fontSize: 14, paddingLeft: "12px", color:'rgb(35 74 78)'}}>
        kCal: {Kcals} || Proteins: {proteins} || Fats: {fats} || Carbs: {carbs}
      </span>
    </div>
  );
}

export default Item;
