<template>
    <div v-if="cartItems.length > 0" class="p-3 flex flex-col justify-between">
        <h1 class="text-xl font-bold">Your Cart</h1>
        <ScrollArea class="w-full p-3 h-full">
            <div>
                <template v-for="(cartItem, index) in cartItems">
                    <div class="flex items-center p-2">
                        <div class="min-w-10">{{ cartItem.quantity }}x</div>
                        <div class="mx-2">{{ cartItem.item_name }}</div>
                        <div class="ml-auto"> {{ formatter.format(cartItem.item_price) }}</div>
                    </div>
                    <Separator v-if="index < cartItems.length - 1"/> 
                </template>
            </div>
        </ScrollArea>
        <Button @click="submitOrder()">
            Order Now!
        </Button>
    </div>
    <div v-else class="flex justify-center items-center h-full w-full">
        <div>Your Cart is empty!</div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { getMenu } from '@/scripts/fetchData.js'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'

const cartItems = ref([]);

const formatter = new Intl.NumberFormat('en-SG', {
    style: 'currency',
    currency: 'SGD',
});

function submitOrder() {
    cartItems.value = JSON.parse(sessionStorage.getItem('cart')) || [];
    sessionStorage.clear();
    window.dispatchEvent(new CustomEvent('cart-sessionstorage-changed'));
    window.dispatchEvent(new CustomEvent('restaurant-key-sessionstorage-changed'));
    // do something with cartItems
}

onMounted(() => {
    cartItems.value = JSON.parse(sessionStorage.getItem('cart')) || [];
    window.addEventListener('cart-sessionstorage-changed', (event) => {
        cartItems.value = JSON.parse(sessionStorage.getItem('cart')) || [];
    });
});
</script>