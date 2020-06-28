import faker from 'faker';
import factory from 'factory-girl';
import User, { Role as UserRole } from '@modules/user/schema/UserSchema';
import Book from '@modules/book/schema/BookSchema';

factory.define('User', User, {
    name: faker.name.findName(),
    age: faker.random.number(),
    phone: faker.phone.phoneNumber(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: UserRole.USER
});

factory.define('Book', Book, {
    title: faker.name.findName(),
    isbn: String(faker.random.number({ min: 1000000000, max: 9000000000 })),
    category: faker.random.word(),
    year: faker.random.number({ min: 1950, max: 2020 })
    // cover: faker.image.imageUrl()
});

export default factory;
