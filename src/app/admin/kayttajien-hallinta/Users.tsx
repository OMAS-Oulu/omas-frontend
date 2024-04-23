import { AdminQueryUser, AdminUser } from '@/types/commonTypes';
import User from './User';

interface UsersProps {
    data: AdminQueryUser
}

const Users = ({ data }: UsersProps) => {

    const content = data.content;

    return (
        <div className='flex flex-col gap-4 w-full'>
            <h1 className='text-2xl'>Käyttäjätiedot:</h1>
            {content && content.map((user: AdminUser, index: number) => (
                <User user={user} key={index} />
            ))}
        </div>
    )
}

export default Users;