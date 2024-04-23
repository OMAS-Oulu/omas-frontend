import { AdminViewType } from '@/types/commonTypes';
import UsersMain from "./UsersMain";
import CreateClub from './CreateClub';
import ImageViewer from './ImageViewer';
import AddCompetition from './AddCompetition';

interface AdminHelperProps {
    type: AdminViewType,
}

const AdminHelper = ({ type }: AdminHelperProps) => {

    switch (type) {
        case AdminViewType.Users:
            return (
                <div>
                    <UsersMain />
                </div>
            )
        case AdminViewType.CreateClub:
            return (
                <CreateClub />
            )
        case AdminViewType.ImageViewer:
            return (
                <ImageViewer />
            )
        case AdminViewType.CreateCompetition:
            return (
                <AddCompetition />
            )
        default:
            return (
                <div className='flex flex-col gap-2 w-full py-4'>
                    <h1 className='text-2xl'>Pääkäyttäjänäkymä</h1>
                    <p className='text-md'>Valitse ylläolevista toiminnoista</p>
                </div>
            )
    }

}

export default AdminHelper;