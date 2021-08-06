import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = (props) => {
  const { meetupData } = props;
  return (
    <>
      <Head>
        <title>{meetupData.title}</title>
        <meta name="description" content={meetupData.description} />
      </Head>
      <MeetupDetail {...meetupData} />
    </>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://kriz:ZskBNoTtk6k1fniB@cluster0.dabc7.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://kriz:ZskBNoTtk6k1fniB@cluster0.dabc7.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  let selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  selectedMeetup = { id: selectedMeetup._id.toString(), ...selectedMeetup };
  delete selectedMeetup._id;

  client.close();

  return {
    props: {
      meetupData: selectedMeetup,
    },
  };
}

export default MeetupDetails;
