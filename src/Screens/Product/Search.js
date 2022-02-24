import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { size } from "lodash";
import StatusBar from '../../components/StatusBar';
import Search from '../../components/Search/Search';
import ScreenLoading from "../../components/Search/ScreenLoading"
import ResultNotFound from '../../components/Search/ResultNotFound';
import ProductList from '../../components/Search/ProductList';
import { searchProductsApi } from "../../api/search";
import colors from '../../../styles/colors';

export default function SearchScreen(props) {
    const { route } = props;
    const { params } = route;
    const [products, setProducts] = useState(null)
    console.log('Screen Search -> ' + params.search);

    useEffect(() => {
        (
            async () => {
                setProducts(null);
                const response = await searchProductsApi(params.search);
                setProducts(response)
            }
        )()
    }, [params.search])

    return (
        <>
            <StatusBar backgrounColor={colors.bgDark} barStyle="light-content" />
            <Search currentSearch={params.search} />
            {!products ? (
                <ScreenLoading text="Buscando Productos" />

            ) : size(products) === 0 ? (
                <ResultNotFound search={params.search} />
            ) : (
                <ProductList products={products} />
            )}
        </>
    )
}
