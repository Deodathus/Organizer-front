import {Box, Skeleton} from "@chakra-ui/react";
import ItemSkeletonComponent from "./ItemSkeletonComponent";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import ItemCrudActionCreator from "../../../../actions/item/ItemCrudActionCreator";
import CrudItemReducer from "../../../../reducers/item/CrudItemReducer";
import Statuses from "../../../../dictionaries/actions/item/Statuses";

export default function ItemComponent(props) {
    const dispatch = useDispatch();
    const itemId = props.itemId;

    const item = useSelector(state => {
        return Object.values(state.items.elements).find(item => item.id === parseInt(itemId));
    });

    if (!item) {
        const fetchOneItem = CrudItemReducer.fetchOne(ItemCrudActionCreator.fetchOne(itemId));

        dispatch(fetchOneItem);
    }

    const [status, setStatus] = useState(Statuses.loading);

    useSelector(state => {
        switch (state.items.status) {
            default:
            case Statuses.loading:
                break;
            case Statuses.finished:
                if (status !== Statuses.finished) {
                    setStatus(Statuses.finished);
                }
                break;
        }
    });

    if (item || status === Statuses.finished) {
        return (
            <Box className='itemShowContent'>
                <Box>
                    <Skeleton height='60px' width='60px' />
                </Box>
                <Box>
                    <span className='itemShowLabel'>Name:</span> {item.name}
                </Box>
                <Box>
                    <span className='itemShowLabel'>Key:</span> {item.key}
                </Box>
                <Box>
                    <span className='itemShowLabel'>Sub key:</span> {item.subKey}
                </Box>
            </Box>
        );
    }

    return (
        <ItemSkeletonComponent />
    );
}
