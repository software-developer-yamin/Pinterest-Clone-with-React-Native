import { useNhostClient } from "@nhost/react";
import { useEffect, useState } from "react";
import MasonryList from "../components/MasonryList";

export default function HomeScreen() {
  const nhost = useNhostClient();
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPins = async () => {
    setLoading(true);
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
    setLoading(false);
  };

  useEffect(() => {
    fetchPins();
  }, []);

  return <MasonryList pins={pins} onRefresh={fetchPins} refreshing={loading} />;
}
