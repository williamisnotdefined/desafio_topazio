import faker from 'faker';
import factory from 'factory-girl';
import User, { Role as UserRole } from '@modules/user/schema/UserSchema';

factory.define('User', User, {
    name: faker.name.findName(),
    age: faker.random.number(),
    phone: faker.phone.phoneNumber(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: UserRole.USER
});

export default factory;
