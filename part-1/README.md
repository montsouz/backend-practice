## Product API

To solve this problem I used a NodeJs framework called Nest, It's definitely my favorite framework for Node because it helps you to solve a lot of different issues (DI, Scalability, Modularity) and it comes with a lot of built-in stuff too. 

I also used Redis for storage. It's easy to use, blazing fast and perfect in this scenario.

#### How To Run Tests

To run tests for this application you're going to need Docker.

```docker-compose -f docker-compose.test.yml up```

#### How to Run The API

You don't need docker for this one, but I recommend to.

```docker-compose up```

The application will be available at `:5001`

To run without Docker

```bash

npm install
npm run build
npm start:dev

```

#### Solution

My logic to solve the problem is located inside a route guard. `(src/commom/guards)`

```typescript
 async canActivate(context: ExecutionContext): Promise<boolean> {
    const message = context.getArgByIndex(0);
    const hashedMessage = hash(message.body);
    if (await this.redisClient.get(hashedMessage)) {
      Logger.log('You shall not pass!', 'Guard', false);
      return false;
    }
    this.redisClient.set(hashedMessage, 'true', 'ex', 10 * 60);
    Logger.log('You are free to go :)', 'Guard', false);
    return true;
  }
```

I think it is a reasonably good solution because it barriers the request before it reaches the controller.The body is stored inside redis in a hash format, so it has a constant size and it is way easier to make comparisons than the object itself.
