// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import { logger } from '../config/logger';

// dotenv.config({ path: __dirname + '/.env' });


// const connectDatabase = async () => {
//   try {
//     let uri = 'lincoln.smith.85@gmail.com';//process.env.DB_CONNECTION
//     let testDB = 'no'; //process.env.TEST_DB || 'no';
//     if (testDB == 'yes' && process.env.TEST_DB_CONNECTION) uri = process.env.TEST_DB_CONNECTION
//     mongoose.connect(uri, {
//         //useNewUrlParser: true,
//         //useUnifiedTopology: true,
//         //useCreateIndex: true,
//     });
//     const connection = mongoose.connection;
//     connection.once("open", (error, db) => {
//       if (error) {
//         logger.error(error.message);
//       } else {
//         logger.info("MongoDB database connection established successfully");
//       }
//     });
//   } catch (error) {
//     logger.error(error.message);
//     process.exit(1);
//   }
// };
// export default connectDatabase;

import mongoose from "mongoose";
import dotenv from "dotenv";
import { logger } from '../config/logger';

dotenv.config({ path: __dirname + '/.env' });

const connectDatabase = async () => {
  try {
    let uri = `mongodb+srv://lincolns765:KhuD79RPto7OdkEg!@cluster1.dgo5d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`;
    let testDB = 'no';//process.env.TEST_DB || 'no';
    // if (testDB == 'yes' && process.env.TEST_DB_CONNECTION) {
    //   uri = process.env.TEST_DB_CONNECTION;
    // }
    console.log('==== >> uri == >> ', uri);
    
    await mongoose.connect(uri, {
      //useNewUrlParser: true,
      //useUnifiedTopology: true,
    });

    const connection = mongoose.connection;
    connection.once("open", (error, db) => {
      if (error) {
        logger.error(error.message);
      } else {
        logger.info("MongoDB database connection established successfully");
      }
    });
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};

export default connectDatabase;