import classes from "./MealsSummary.module.css";

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      {/* <h2>אוכל טעים ואיכותי נשלח ישר אליך</h2> */}
      <p>שעות פתיחה </p>
      <p>א-ה 21:00–10:00</p>
      <p>ו 15:00–10:00</p>
      <p>טלפון: 04-624-7888</p>
    </section>
  );
};

export default MealsSummary;
