<template>
    <ScrollArea class="h-full flex p-3 items-center">
        <h1 class="text-xl font-bold">Restaurants</h1>
        <div class="items-center flex justify-center">
            <Button variant="outline" size="icon" @click="page -= page > 1 ? 1 : 0">
                <ChevronLeft class="w-4 h-4" />
            </Button>
            <Select :model-value="page" @update:model-value="newPage => page = newPage">
                <SelectTrigger class="w-[70px] mx-2">
                    <SelectValue :placeholder="String(page)" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem v-for="i in maxPages" :value="i">
                            {{i}}
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Button variant="outline" size="icon" @click="page += page < maxPages ? 1 : 0">
                <ChevronRight class="w-4 h-4" />
            </Button>
        </div>
        <div>
            <Card v-for="restaurant in restaurants" class="my-2">
                <CardHeader>
                    <CardTitle>{{restaurant.restaurant_name}}</CardTitle>
                    <CardDescription>{{restaurant.restaurant_description}}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button @click="setRestaurant(restaurant.restaurant_id, restaurant.restaurant_name)">Select Restaurant</Button>
                </CardContent>
            </Card>
        </div>
    </ScrollArea>
</template>

<script setup>
    import { ref, onMounted, computed } from 'vue'
    import { ScrollArea } from '@/components/ui/scroll-area'
    import { Button } from '@/components/ui/button'
    import { getRestaurants } from '@/scripts/fetchData.js'
    import { ChevronRight, ChevronLeft } from 'lucide-vue-next'
    import {
        Card,
        CardContent,
        CardDescription,
        CardFooter,
        CardHeader,
        CardTitle,
    } from '@/components/ui/card'
    import {
        Select,
        SelectContent,
        SelectGroup,
        SelectItem,
        SelectLabel,
        SelectTrigger,
        SelectValue,
    } from '@/components/ui/select'
    const pageRef = ref(1)
    const maxPages = 7
    const restaurants = ref([]);
    const fetchRestaurants = async (pageNumber) => {
        restaurants.value = await getRestaurants(pageNumber)
    }
    const page = computed({
        get: () => pageRef.value,
        set: (newPage) => {
            pageRef.value = newPage
            fetchRestaurants(newPage)
        }
    })
    
    function setRestaurant(id, name) {
        sessionStorage.selectedRestaurant = id; 
        sessionStorage.selectedRestaurantName = name; 
        console.log(`set ${sessionStorage.selectedRestaurant}`)
        window.dispatchEvent(new CustomEvent('restaurant-key-sessionstorage-changed'));
    }
    onMounted(() => {
        fetchRestaurants(pageRef.value)
    })
</script>