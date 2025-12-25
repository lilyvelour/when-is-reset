import { DateTime } from 'luxon';
import { useState, useEffect } from 'react';
import './App.css';

function getDailyReset() {
  const now = new Date();
  const reset = new Date();

  reset.setUTCDate(now.getUTCSeconds() > 0 ? now.getUTCDate() + 1 : now.getUTCDate());
  reset.setUTCHours(0);
  reset.setUTCMinutes(0);
  reset.setUTCSeconds(0);
  reset.setUTCMilliseconds(0);

  return DateTime.fromISO(reset.toISOString());
}

function getWeeklyReset() {
  const now = new Date();
  const reset = new Date();

  const nextMonday = now.getUTCDate() + (((1 + 7 - now.getUTCDay()) % 7) || 7)
  const isReset = now.getUTCDate() === 1 && now.getUTCHours() === 7 && now.getUTCMinutes() === 30 && now.getUTCSeconds() === 0;

  reset.setUTCDate(isReset ? now.getDate() : nextMonday);
  reset.setUTCHours(7);
  reset.setUTCMinutes(30);
  reset.setUTCSeconds(0);
  reset.setUTCMilliseconds(0);

  return DateTime.fromISO(reset.toISOString());
}

function App() {
  const [reset, setReset] = useState({daily: getDailyReset(), weekly: getWeeklyReset(), now: DateTime.now()});

  useEffect(() => {
    const interval = setInterval(() => {
      setReset({daily: getDailyReset(), weekly: getWeeklyReset(), now: DateTime.now()});
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>When is <a className="App-link" href="https://wiki.guildwars2.com/wiki/Server_reset" target="_blank" rel="noreferrer">reset</a> in Guild Wars 2?</h1>
        <h2>Daily</h2>
        {reset.daily.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)} ({reset.daily.toRelative()})
        <h2>Weekly</h2>
        {reset.weekly.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)} ({reset.weekly.toRelative()})
        <h5>
          It is currently {reset.now.toLocaleString({ weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: '2-digit'})}
        </h5>
      </header>
    </div>
  );
}

export default App;
