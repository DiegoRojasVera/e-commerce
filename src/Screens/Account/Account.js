import React, { useState, useCallback } from 'react'
import { ScrollView, Text } from 'react-native';
import { useFocusEffect } from "@react-navigation/native";
import Search from '../../components/Search/Search';
import ScreenLoading from '../../components/Search/ScreenLoading';
import UserInfo from '../../components/Account/UserInfo';
import Menu from '../../components/Account/Menu';
import StatusBar from '../../components/StatusBar';
import { getMeApi } from "../../api/user"
import useAuth from '../../hooks/useAuth';
import colors from '../../../styles/colors';

export default function Account() {
    const [user, setUser] = useState(null);
    const { auth } = useAuth();

    console.log(auth);

    useFocusEffect(
        useCallback(() => {
            (async () => {
                const response = await getMeApi(auth.token);
                setUser(response)
                console.log(response)
            })();
        }, [])
    );


    return (
        <>
            <StatusBar backgroundColor={colors.bgDark} barStyle="light-content" />

            {!user ? (
                <ScreenLoading size="large" />
            ) : (
                <>
                    <ScrollView>
                        <Search />
                        <UserInfo user={user} />
                        <Menu />
                    </ScrollView>
                </>
            )}

        </>
    )
}
