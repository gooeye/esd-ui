
<script setup>
import { ref, onMounted, computed } from 'vue'
import { getMenu } from '@/scripts/fetchData.js'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
        Card,
        CardContent,
        CardDescription,
        CardFooter,
        CardHeader,
        CardTitle,
    } from '@/components/ui/card'

const menuItems = ref([]); 

const fetchMenuData = async (menuId) => {
    console.log(`fetching ${menuId}`)
    let data = await getMenu(menuId);
    menuItems.value = data.map(item => ({ ...item, quantity: 1 })); 
};
const formatter = new Intl.NumberFormat('en-SG', {
    style: 'currency',
    currency: 'SGD',

});
function addToCart(item) {
    console.log(`adding ${item.quantity}x ${item.item_name} to Cart`)
    let currentCart = JSON.parse(sessionStorage.getItem('cart')) || [];
    const existingItemIndex = currentCart.findIndex(cartItem => cartItem.item_id === item.item_id);

    if (existingItemIndex !== -1) {
        currentCart[existingItemIndex].quantity += item.quantity;
    } else {
        currentCart.push(item);
    }
    sessionStorage.setItem('cart', JSON.stringify(currentCart));
    window.dispatchEvent(new CustomEvent('cart-sessionstorage-changed'));
}
const restaurantName = ref("")
onMounted(() => {
    fetchMenuData(sessionStorage.selectedRestaurant); 
    restaurantName.value = sessionStorage.selectedRestaurantName;
    window.addEventListener('restaurant-key-sessionstorage-changed', (event) => {
        fetchMenuData(sessionStorage.selectedRestaurant);
        restaurantName.value = sessionStorage.selectedRestaurantName;
    });
});
</script>
<template>
    <ScrollArea class="w-full p-3 " v-if="restaurantName">
        <h1 class="text-xl font-bold">Currently Browsing: {{ restaurantName }}</h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card v-for="item in menuItems" class="my-2 h-30...">
                <CardHeader>
                    <CardTitle>{{item.item_name}}</CardTitle>
                    <CardDescription>{{item.item_description}}</CardDescription>
                </CardHeader>
                <CardContent>
                    {{formatter.format(item.item_price)}}
                </CardContent>
                <CardFooter class="flex flex-col">
                    <div class="w-full flex justify-center items-center py-2">
                        <Button variant="outline" size="icon" @click="item.quantity -= item.quantity > 1 ? 1 : 0">
                            -
                        </Button>
                        <div class=" mx-3">{{ item.quantity }}</div>
                        <Button variant="outline" size="icon" @click="item.quantity += item.quantity < 100 ? 1 : 0">
                            +
                        </Button>
                    </div>
                    <Button class="w-full" @click="addToCart(item)">
                        Add To Cart
                    </Button>
                </CardFooter>
            </Card>
        </div>
    </ScrollArea>
    <div v-else class="flex justify-center items-center h-full w-full">
        <div>Select a restaurant to get started!</div>
    </div>
</template>
