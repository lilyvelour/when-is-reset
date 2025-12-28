import { DateTime } from "luxon";
import { useState, useEffect } from "react";
import "./App.css";

function getDailyReset() {
  const now = new Date();
  const reset = new Date();

  const isReset =
    now.getUTCHours() === 0 &&
    now.getUTCMinutes() === 0 &&
    now.getUTCSeconds() === 0;

  reset.setUTCDate(isReset ? now.getUTCDate() : now.getUTCDate() + 1);
  reset.setUTCHours(0);
  reset.setUTCMinutes(0);
  reset.setUTCSeconds(0);
  reset.setUTCMilliseconds(0);

  return DateTime.fromISO(reset.toISOString());
}

function getWeeklyReset() {
  const now = new Date();
  const reset = new Date();

  const nextMonday = now.getUTCDate() + ((1 + 7 - now.getUTCDay()) % 7 || 7);
  const isReset =
    now.getUTCDate() === 1 &&
    now.getUTCHours() === 7 &&
    now.getUTCMinutes() === 30 &&
    now.getUTCSeconds() === 0;

  reset.setUTCDate(isReset ? now.getUTCDate() : nextMonday);
  reset.setUTCHours(7);
  reset.setUTCMinutes(30);
  reset.setUTCSeconds(0);
  reset.setUTCMilliseconds(0);

  return DateTime.fromISO(reset.toISOString());
}

function getMapBonusReset() {
  const now = new Date();
  const reset = new Date();

  const nextThursday = now.getUTCDate() + ((4 + 7 - now.getUTCDay()) % 7 || 7);
  const isReset =
    now.getUTCDate() === 4 &&
    now.getUTCHours() === 20 &&
    now.getUTCMinutes() === 0 &&
    now.getUTCSeconds() === 0;

  reset.setUTCDate(isReset ? now.getUTCDate() : nextThursday);
  reset.setUTCHours(20);
  reset.setUTCMinutes(0);
  reset.setUTCSeconds(0);
  reset.setUTCMilliseconds(0);

  return DateTime.fromISO(reset.toISOString());
}

function getWvWResetNa() {
  const now = new Date();
  const reset = new Date();

  const nextFriday = now.getUTCDate() + ((5 + 7 - now.getUTCDay()) % 7 || 7);
  const isReset =
    now.getUTCDate() === 5 &&
    now.getUTCHours() === 18 &&
    now.getUTCMinutes() === 0 &&
    now.getUTCSeconds() === 0;

  reset.setUTCDate(isReset ? now.getUTCDate() : nextFriday);
  reset.setUTCHours(18);
  reset.setUTCMinutes(0);
  reset.setUTCSeconds(0);
  reset.setUTCMilliseconds(0);

  return DateTime.fromISO(reset.toISOString());
}

function getWvWResetEu() {
  const now = new Date();
  const reset = new Date();

  const nextSaturday = now.getUTCDate() + ((6 + 7 - now.getUTCDay()) % 7 || 7);
  const isReset =
    now.getUTCDate() === 6 &&
    now.getUTCHours() === 2 &&
    now.getUTCMinutes() === 0 &&
    now.getUTCSeconds() === 0;

  reset.setUTCDate(isReset ? now.getUTCDate() : nextSaturday);
  reset.setUTCHours(2);
  reset.setUTCMinutes(0);
  reset.setUTCSeconds(0);
  reset.setUTCMilliseconds(0);

  return DateTime.fromISO(reset.toISOString());
}

function App() {
  const [reset, setReset] = useState({
    daily: getDailyReset(),
    weekly: getWeeklyReset(),
    mapBonus: getMapBonusReset(),
    wvwNa: getWvWResetNa(),
    wvwEu: getWvWResetEu(),
    now: DateTime.now(),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setReset({
        daily: getDailyReset(),
        weekly: getWeeklyReset(),
        mapBonus: getMapBonusReset(),
        wvwNa: getWvWResetNa(),
        wvwEu: getWvWResetEu(),
        now: DateTime.now(),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          When is{" "}
          <a
            className="App-highlight"
            href="https://wiki.guildwars2.com/wiki/Server_reset"
            target="_blank"
            rel="noreferrer"
          >
            reset
          </a>{" "}
          in Guild Wars 2?
        </h1>
        <h2>Daily</h2>
        {reset.daily.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)} (
        {reset.daily.toRelative()})<h2>Weekly</h2>
        {reset.weekly.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)} (
        {reset.weekly.toRelative()})<h2>Map Bonus</h2>
        {reset.mapBonus.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)} (
        {reset.mapBonus.toRelative()})
        <h2>
          WvW (NA)<sup>*</sup>
        </h2>
        {reset.wvwNa.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)} (
        {reset.wvwNa.toRelative()})
        <h2>
          WvW (EU)<sup>*</sup>
        </h2>
        {reset.wvwEu.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)} (
        {reset.wvwEu.toRelative()})
        <h5>
          It is currently{" "}
          <span className="App-highlight">
            {reset.now.toLocaleString({
              weekday: "short",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              second: "2-digit",
            })}
          </span>
        </h5>
        <div className="App-reference">
          <sup>*</sup> World vs. World reset times{" "}
          <a
            className="App-highlight"
            href="https://wiki.guildwars2.com/wiki/World_versus_World#Weekly_WvW_reset"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            are approximate
          </a>{" "}
          and may vary by a few minutes.
        </div>
      </header>
      <footer className="App-footer">
        <span>
          Made by{" "}
          <a
            className="App-highlight"
            href="https://bsky.app/profile/lily.velour.social"
            target="_blank"
            rel="noreferrer"
          >
            Lily Velour
          </a>
        </span>
      </footer>
    </div>
  );
}

export default App;
