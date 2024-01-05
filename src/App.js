import Player from "./components/Player";
import TimmerChallenge from "./components/TimmerChallenge";

function App() {
  return (
    <>
      <Player />
      <div id="challenges">
      <TimmerChallenge tittle='easy' targetTime={1}/>
      <TimmerChallenge tittle='Not easy' targetTime={5}/>
      <TimmerChallenge tittle='Getting Tough' targetTime={10}/>
      <TimmerChallenge tittle='Pros Only' targetTime={15}/>
      </div>
    </>
  );
}

export default App;
