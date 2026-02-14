
import instaIcon from "../assets/instagram-icon.svg";

export default function ConnectCard() {

  const instagramLink =
    "https://ig.me/m/sp_garuda";

  return (
    <div className="relative h-full w-full flex items-center justify-center px-4">
      
      {/* 🔲 Card Wrapper */}
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl
                      h-full flex flex-col justify-center
                      rounded-3xl
                      px-6 py-8">

        {/* 💖 Title */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-pink-600">
            Let’s Talk 💌
          </h2>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            One click and you’re in my DMs 🙂
          </p>
        </div>

        {/* 🔗 Buttons */}
        <div className="flex flex-col gap-4 mt-8">

          {/* Instagram */}
          <a
            href={instagramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden
                       flex items-center justify-center gap-3
                       rounded-2xl
                       bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
                       text-white py-4
                       text-base md:text-lg font-semibold
                       shadow-lg transition
                       hover:scale-[1.03]"
          >
            <img src={instaIcon} alt="" className="w-6 h-6" />
            <span>Message me on Instagram</span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white transition" />
          </a>
        </div>

        {/* 🎧 Audio */}
        {/* <div className="mt-8 flex justify-center">
          <AudioMessage
            audioFile={Audiofile}
            hasPlayed={hasPlayed}
            markPlayed={markPlayed}
            onAudioReady={attachAudio}
          />
        </div> */}
      </div>
    </div>
  );
}
