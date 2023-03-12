<script >
import ShedulViews from './components/SheduleViews.vue'

export default {
    components: {
        ShedulViews
    },
    data() {
        return {
            isMobileMenuOpen: false,
        }
    },
}
</script>

<template>
    <div class="bg-gray-100">
        <header class="bg-white shadow-sm">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav class="flex items-center ml-5 justify-between h-16">
                    <!-- Logo -->
                    <div class="flex-shrink-0">
                        <img class="h-8 w-8" src="./assets/logo.svg" alt="Logo">
                    </div>
                    Планировщик для общей разработке или общения
                    <!-- Navigation links -->
                    <div class="hidden md:block">
                        <ul class="ml-10 flex items-baseline space-x-4">
                            <li class="text-gray-600 hover:text-gray-900">
                                <a href="#">Комнаты</a>
                            </li>
                        <li class="text-gray-600 hover:text-gray-900">
                            <a href="#">Создать</a>
                        </li>
                            <li class="text-gray-600 hover:text-gray-900">
                                <a href="#">О проекте</a>
                            </li>
                        </ul>
                    </div>

                    <!-- Mobile menu button -->
                    <div class="-mr-2 flex md:hidden">
                    <button @click="isMobileMenuOpen = !isMobileMenuOpen" type="button"
                        class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
                        aria-controls="mobile-menu" aria-expanded="false">
                            <span class="sr-only">Меню</span>
                            <svg :class="{ 'hidden': isMobileMenuOpen, 'block': !isMobileMenuOpen }" class="block h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <svg :class="{ 'block': isMobileMenuOpen, 'hidden': !isMobileMenuOpen }" class="hidden h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </nav>
            </div>

            <!-- Mobile menu, toggle classes based on menu state. -->
            <div :class="{ 'block': isMobileMenuOpen, 'hidden': !isMobileMenuOpen }" class="md:hidden" id="mobile-menu">
                <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <a href="#" class="text-gray-600 hover:text-gray-900 block">Комнаты</a>
                    <a href="#" class="text-gray-600 hover:text-gray-900 block">Создать</a>
                </div>
            </div>
        </header>
    </div>
    <ShedulViews />
</template>


