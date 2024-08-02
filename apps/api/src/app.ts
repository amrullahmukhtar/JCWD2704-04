import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
  Router,
} from 'express';
import cors from 'cors';
import path from 'path';
import userRouter from './routers/user.router';
import adminRouter from './routers/admin.router';
import developerRouter from './routers/developer.router';
import { corsOption, PORT } from './config';
import jobRouter from './routers/job.router';
import userDataRouter from './routers/userData.router';

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use(cors(corsOption));
  }

  private routes(): void {
    this.app.get('/', (req: Request, res: Response) => {
      res.send(`Hello, Purwadhika Student API!`);
    });

    this.app.use('/user', userRouter.getRouter());
    this.app.use('/admin', adminRouter.getRouter());
    this.app.use('/dev', developerRouter.getRouter());
    this.app.use('/job', jobRouter.getRouter());
    this.app.use('/userdata', userDataRouter.getRouter());
    this.app.use(
      '/uploads/avatars',
      express.static(path.join(__dirname, '/uploads/avatars')),
    );
    this.app.use(
      '/uploads/cvs',
      express.static(path.join(__dirname, '/uploads/cvs')),
    );
  }

  private handleError(): void {
    // not found
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/')) {
        res.status(404).send('Not found !');
      } else {
        next();
      }
    });

    // error
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.path.includes('/')) {
          console.error('Error : ', err.stack, err.message);
          res.status(500).send(err.message);
        } else {
          next();
        }
      },
    );
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}`);
    });
  }
}
