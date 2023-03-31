import Home from "../pages/Home";

export default {
  root: "$",
  routes: [
    {
      path: "$",
      component: Home,
    },
  ],
  // beforeEachRoute(from, to) {
  //   return new Promise((resolve) => {
  //     let isLoggedIn = true;

  //     if (isLoggedIn) {
  //       console.log("you can't access the profile page");
  //       resolve(from);
  //     } else {
  //       console.log(`user navigated to ${to._hash}`);
  //       resolve(true);
  //     }
  //   });
  // },
  afterEachRoute(to) {
    console.log(to);
  },
};
