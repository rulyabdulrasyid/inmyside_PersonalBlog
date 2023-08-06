"use strict";

const { QueryError, QueryInterface } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Contents", [
      {
        user_id: 1,
        title: "Realita Penerapan Kurikulum Merdeka",
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. In sagittis nisi vitae sem lacinia, at cursus neque ultrices. Ut dapibus, nulla nec consectetur pharetra, orci lectus luctus velit, sit amet posuere erat libero id turpis. Duis dapibus tortor eget elit tempus, in laoreet est fermentum. Sed posuere, elit id ultrices fermentum, elit odio consectetur odio, a lacinia nunc est eu arcu. Nam pharetra, velit id consectetur volutpat, ex dui aliquet tortor, nec commodo odio arcu nec ipsum. Nulla facilisi. Fusce eu nunc nisl. In egestas lorem eu elit vulputate, ac tincidunt quam consectetur.

        Nunc pellentesque nisl ut velit fringilla bibendum. Suspendisse non odio eu turpis lacinia accumsan eu non sapien. Nullam non metus vel tortor cursus auctor. Etiam ac leo eget nunc interdum viverra. Mauris sagittis nibh eu mauris volutpat bibendum. Sed posuere neque in elit suscipit, in elementum sapien dapibus. In ut justo ac purus venenatis interdum nec vel lectus. Suspendisse venenatis dictum odio, vel viverra odio feugiat vel. Aliquam fringilla dapibus purus, ac pellentesque nisi facilisis nec. Nullam efficitur nunc sit amet augue iaculis, eu consectetur nisl venenatis.
        
        Pellentesque bibendum turpis ut felis iaculis laoreet. Nulla ut mi vitae libero laoreet pellentesque eu quis tellus. Vestibulum viverra libero a finibus vulputate. Suspendisse nec neque quis justo iaculis rutrum. Vestibulum non quam felis. Maecenas laoreet est a bibendum malesuada. Nulla facilisi. Integer ac posuere arcu. In eget dolor dolor. Sed at tellus ac odio malesuada finibus at nec quam. Sed euismod nunc at nisi fringilla, vel elementum quam aliquam. Nulla facilisi. Aenean luctus dolor nec dolor facilisis, id malesuada sapien ullamcorper. Proin commodo quam vel massa venenatis vehicula.`,
        publication: "Ruly Abdul Rasyid",
        published_at: "6 Agustus 2023",
        image:
          "https://images.unsplash.com/photo-1585553616435-2dc0a54e271d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Contents", null, {
      restartIdentity: true,
      trancate: true,
      cascade: true,
    });
  },
};
