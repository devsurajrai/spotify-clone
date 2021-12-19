import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistState, playlistIdState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "../components/Songs";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

function Center() {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [color, setColor] = useState(null);
  const playlistID = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistID]);
  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistID)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((error) =>
        console.log("unableto get the playlist: Something Went Wrong")
      );
  }, [spotifyApi, playlistID]);
  console.log(playlist);
  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide bg-black">
      <header className="absolute top-5 right-8">
        <div
          className={`flex  items-center bg-black space-width-100 rounded-full cursor-pointer p-1 pr-2 hover:opacity-80`}
          onClick={signOut}
        >
          <img
            className="w-8 h-8 rounded-full"
            src={session?.user.image}
            alt=""
          />
          <h2 className="p-1 text-white ">{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5 text-white" />
        </div>
      </header>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8 `}
      >
        <img className="h-44 w-44 shadow-2xl" src={playlist?.images[0]?.url} />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {playlist?.name}
          </h1>
        </div>
      </section>
      <div>
        <Songs />
      </div>
    </div>
  );
}

export default Center;
