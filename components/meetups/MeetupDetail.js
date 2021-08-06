import style from "./MeetupDetail.module.css";

const MeetupDetail = (props) => {
  const { id, description, title, address, image } = props;
  return (
    <section className={style.detail}>
      <img src={image} alt={title} />
      <h1>{title}</h1>
      <address>{address}</address>
      <p>{description}</p>
    </section>
  );
};

export default MeetupDetail;
