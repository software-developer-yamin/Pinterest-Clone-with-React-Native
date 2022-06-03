import { useNhostClient } from "@nhost/react";
import { useEffect, useState } from "react";
import MasonryList from "../components/MasonryList";


export default function HomeScreen() {
  const nhost = useNhostClient();
  const [pins, setPins] = useState([]);

  useEffect(() => {
    const fetchPins = async () => {
      const { data } = await nhost.graphql.request(`
      query MyQuery {
        pins {
          created_at
          user_id
          title
          image
          id
        }
      }
      `);
      setPins(data.pins);
    };
    fetchPins();
  }, []);

  return <MasonryList pins={pins} />;
}
