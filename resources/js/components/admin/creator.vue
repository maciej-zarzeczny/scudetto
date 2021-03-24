<template>
    <div>
        <!-- KROJE -->
        <section class="hero is-info welcome is-small">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">Kroje</h1>
                    <h2 class="subtitle">Edytuj kroje kamizelek</h2>
                </div>
            </div>
        </section>
        <section class="kroje-edit">
            <table class="table is-fullwidth">
                <thead>
                    <tr>
                        <th>Zdjęcie</th>
                        <th>Numer kroju</th>
                        <th>Rodzaj</th>
                        <th>Kołnierz</th>
                        <th>Akcja</th>
                    </tr>
                </thead>
                <tbody v-if="krojeReady">
                    <tr v-for="(kroj, index) in kroje" :key="index">
                        <td>
                            <figure class="image kroj-image">
                                <img
                                    v-if="kroj.female"
                                    :src="
                                        '/images/creator/female/' +
                                            kroj.name +
                                            '.png'
                                    "
                                    alt="Cut image"
                                />
                                <img
                                    v-if="!kroj.female"
                                    :src="
                                        '/images/creator/' + kroj.name + '.png'
                                    "
                                    alt="Cut image"
                                />
                            </figure>
                        </td>
                        <td>{{ kroj.name }}</td>
                        <td>{{ female(kroj) }}</td>
                        <td>{{ collar(kroj) }}</td>
                        <td>
                            <a
                                class="button is-danger is-outlined"
                                @click="deleteKroj(index)"
                            >
                                <span>Usuń</span>
                                <span class="icon is-small">
                                    <i class="fas fa-times"></i>
                                </span>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="add-section">
                <div class="file has-name">
                    <label class="file-label">
                        <input
                            class="file-input"
                            type="file"
                            name="resume"
                            v-on:change="onKrojChange"
                        />
                        <span class="file-cta">
                            <span class="file-icon">
                                <i class="fas fa-upload"></i>
                            </span>
                            <span class="file-label">Wybierz nowy krój...</span>
                        </span>
                        <span class="file-name" v-if="krojImage != null">
                            <span>{{ krojImage[0].name }}</span>
                        </span>
                    </label>
                </div>
                <label class="checkbox">
                    <input type="checkbox" v-model="hasCollar" />
                    Z kołnierzem
                </label>
                <label class="checkbox">
                    <input type="checkbox" v-model="forFemale" />
                    Damski
                </label>
                <div class="control">
                    <button class="button is-primary" @click="addNewKroj()">
                        Dodaj
                    </button>
                </div>
            </div>
        </section>

        <!--------------------------------- 
             TKANINY 
    ----------------------------------->

        <section class="hero is-info welcome is-small">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">Tkaniny</h1>
                    <h2 class="subtitle">Edytuj tkaniny kamizelek</h2>
                </div>
            </div>
        </section>
        <section class="kroje-edit">
            <table class="table is-fullwidth">
                <thead>
                    <tr>
                        <th>Tkanina</th>
                        <th>Nazwa</th>
                        <th>Rodzaj</th>
                        <th>Ilość</th>
                        <th>Akcja</th>
                    </tr>
                </thead>
                <tbody v-if="tkaninyReady">
                    <tr v-for="(tkanina, index) in tkaniny" :key="index">
                        <td>
                            <figure class="image kroj-image">
                                <img
                                    :src="tkanina.icon_url"
                                    alt="Material image"
                                />
                            </figure>
                        </td>
                        <td>{{ tkanina.name }}</td>
                        <td>{{ female(tkanina) }}</td>
                        <td>{{ tkanina.quantity }}</td>
                        <td>
                            <p class="buttons">
                                <a
                                    class="button is-info"
                                    @click="
                                        showTkaninaModal = true;
                                        choosedTkanina = index;
                                    "
                                >
                                    <span class="icon is-small">
                                        <i class="far fa-edit"></i>
                                    </span>
                                    <span>Edytuj</span>
                                </a>
                                <a
                                    class="button is-danger is-outlined"
                                    @click="deleteTkanina(index)"
                                >
                                    <span>Usuń</span>
                                    <span class="icon is-small">
                                        <i class="fas fa-times"></i>
                                    </span>
                                </a>
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="add-tkanina-section">
                <div class="control">
                    <button
                        class="button is-primary"
                        @click="
                            showAddTkaninaModal = true;
                            newTkaninaAmount = 0;
                        "
                    >
                        Dodaj nową tkaninę
                    </button>
                </div>
            </div>
            <!--------------------------------- 
                ADD TKANINA MODAL
      ----------------------------------->
            <div class="modal" :class="{ 'is-active': showAddTkaninaModal }">
                <div class="loader-wrapper" v-if="isLoading">
                    <pulse-loader
                        :loading="true"
                        :color="'#219CEE'"
                        :size="'32px'"
                    ></pulse-loader>
                </div>
                <div
                    class="modal-background"
                    @click="showAddTkaninaModal = false"
                ></div>
                <div class="modal-content">
                    <table class="table is-fullwidth">
                        <thead>
                            <tr>
                                <th>Opis</th>
                                <th>Akcja</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Damska</td>
                                <td>
                                    <label class="checkbox">
                                        <input
                                            type="checkbox"
                                            v-model="femaleTkanina"
                                        />
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td>Ikona</td>
                                <td class="update-controls">
                                    <div class="file has-name">
                                        <label
                                            class="file-label"
                                            @click="whichTkanina = 'icon'"
                                        >
                                            <input
                                                class="file-input"
                                                type="file"
                                                name="resume"
                                                v-on:change="onTkaninaChange"
                                            />
                                            <span class="file-cta">
                                                <span class="file-icon">
                                                    <i
                                                        class="fas fa-upload"
                                                    ></i>
                                                </span>
                                                <span class="file-label"
                                                    >Dodaj zdjęcie...</span
                                                >
                                            </span>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                            <tr v-for="(kroj, index) in kroje" :key="index">
                                <td v-if="kroj.female == femaleTkanina">
                                    Przód ({{ kroj.name }} krój)
                                </td>
                                <td
                                    v-if="kroj.female == femaleTkanina"
                                    class="update-controls"
                                >
                                    <div class="file has-name">
                                        <label
                                            class="file-label"
                                            @click="
                                                whichTkanina = String(kroj.name)
                                            "
                                        >
                                            <input
                                                class="file-input"
                                                type="file"
                                                name="resume"
                                                v-on:change="onTkaninaChange"
                                            />
                                            <span class="file-cta">
                                                <span class="file-icon">
                                                    <i
                                                        class="fas fa-upload"
                                                    ></i>
                                                </span>
                                                <span class="file-label"
                                                    >Dodaj zdjęcie...</span
                                                >
                                            </span>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Tył</td>
                                <td class="update-controls">
                                    <div class="file has-name">
                                        <label
                                            class="file-label"
                                            @click="whichTkanina = 'back'"
                                        >
                                            <input
                                                class="file-input"
                                                type="file"
                                                name="resume"
                                                v-on:change="onTkaninaChange"
                                            />
                                            <span class="file-cta">
                                                <span class="file-icon">
                                                    <i
                                                        class="fas fa-upload"
                                                    ></i>
                                                </span>
                                                <span class="file-label"
                                                    >Dodaj zdjęcie...</span
                                                >
                                            </span>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Pasek</td>
                                <td class="update-controls">
                                    <div class="file has-name">
                                        <label
                                            class="file-label"
                                            @click="
                                                whichTkanina = 'single_addon'
                                            "
                                        >
                                            <input
                                                class="file-input"
                                                type="file"
                                                name="resume"
                                                v-on:change="onTkaninaChange"
                                            />
                                            <span class="file-cta">
                                                <span class="file-icon">
                                                    <i
                                                        class="fas fa-upload"
                                                    ></i>
                                                </span>
                                                <span class="file-label"
                                                    >Dodaj zdjęcie...</span
                                                >
                                            </span>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Pasek z kołnierzem</td>
                                <td class="update-controls">
                                    <div class="file has-name">
                                        <label
                                            class="file-label"
                                            @click="
                                                whichTkanina = 'collar_addon'
                                            "
                                        >
                                            <input
                                                class="file-input"
                                                type="file"
                                                name="resume"
                                                v-on:change="onTkaninaChange"
                                            />
                                            <span class="file-cta">
                                                <span class="file-icon">
                                                    <i
                                                        class="fas fa-upload"
                                                    ></i>
                                                </span>
                                                <span class="file-label"
                                                    >Dodaj zdjęcie...</span
                                                >
                                            </span>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <input
                        class="input"
                        type="tel"
                        placeholder="Ilość"
                        v-model="newTkaninaAmount"
                    />
                    <div class="control">
                        <button
                            class="button is-primary"
                            @click="addTkaninaAmount()"
                        >
                            Zapisz
                        </button>
                    </div>
                </div>
                <button
                    class="modal-close is-large"
                    aria-label="close"
                    @click="showAddTkaninaModal = false"
                ></button>
            </div>
            <!--------------------------------- 
                EDIT TKANINA MODAL 
      ----------------------------------->
            <div
                class="modal"
                :class="{ 'is-active': showTkaninaModal }"
                v-if="tkaninyReady && tkaniny.length > 0"
            >
                <div class="loader-wrapper" v-if="isLoading">
                    <pulse-loader
                        :loading="true"
                        :color="'#219CEE'"
                        :size="'32px'"
                    ></pulse-loader>
                </div>
                <div
                    class="modal-background"
                    @click="showTkaninaModal = false"
                ></div>
                <div class="modal-content">
                    <table class="table is-fullwidth">
                        <thead>
                            <tr>
                                <th>Zdjęcie</th>
                                <th>Opis</th>
                                <th>Akcja</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>
                                    {{
                                        tkaniny[choosedTkanina].female == 1
                                            ? "Damska"
                                            : "Męska"
                                    }}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <figure class="image kroj-image">
                                        <img
                                            :src="
                                                tkaniny[choosedTkanina].icon_url
                                            "
                                            alt="Material icon"
                                        />
                                    </figure>
                                </td>
                                <td>Ikona</td>
                                <td class="update-controls">
                                    <div class="file has-name">
                                        <label
                                            class="file-label"
                                            @click="whichTkanina = 'icon'"
                                        >
                                            <input
                                                class="file-input"
                                                type="file"
                                                name="resume"
                                                v-on:change="onTkaninaChange"
                                            />
                                            <span class="file-cta">
                                                <span class="file-icon">
                                                    <i
                                                        class="fas fa-upload"
                                                    ></i>
                                                </span>
                                                <span class="file-label"
                                                    >Wybierz zdjęcie...</span
                                                >
                                            </span>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                            <tr v-for="(kroj, index) in kroje" :key="index">
                                <td
                                    v-if="
                                        tkaniny[choosedTkanina].female ==
                                            kroj.female
                                    "
                                >
                                    <figure class="image kroj-image">
                                        <img
                                            v-if="
                                                tkaniny[choosedTkanina]
                                                    .female == 1
                                            "
                                            :src="
                                                '/images/creator/female/' +
                                                    kroj.name +
                                                    '/' +
                                                    tkaniny[choosedTkanina]
                                                        .name +
                                                    '.png'
                                            "
                                            alt="Material icon"
                                        />
                                        <img
                                            v-if="
                                                tkaniny[choosedTkanina]
                                                    .female == 0
                                            "
                                            :src="
                                                '/images/creator/' +
                                                    kroj.name +
                                                    '/' +
                                                    tkaniny[choosedTkanina]
                                                        .name +
                                                    '.png'
                                            "
                                            alt="Material icon"
                                        />
                                    </figure>
                                </td>
                                <td
                                    v-if="
                                        tkaniny[choosedTkanina].female ==
                                            kroj.female
                                    "
                                >
                                    Przód ({{ kroj.name }} krój)
                                </td>
                                <td
                                    v-if="
                                        tkaniny[choosedTkanina].female ==
                                            kroj.female
                                    "
                                    class="update-controls"
                                >
                                    <div class="file has-name">
                                        <label
                                            class="file-label"
                                            @click="
                                                whichTkanina = String(kroj.name)
                                            "
                                        >
                                            <input
                                                class="file-input"
                                                type="file"
                                                name="resume"
                                                v-on:change="onTkaninaChange"
                                            />
                                            <span class="file-cta">
                                                <span class="file-icon">
                                                    <i
                                                        class="fas fa-upload"
                                                    ></i>
                                                </span>
                                                <span class="file-label"
                                                    >Wybierz zdjęcie...</span
                                                >
                                            </span>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <figure class="image kroj-image">
                                        <img
                                            :src="
                                                tkaniny[choosedTkanina]
                                                    .back_image_url
                                            "
                                            alt="Material icon"
                                        />
                                    </figure>
                                </td>
                                <td>Tył</td>
                                <td class="update-controls">
                                    <div class="file has-name">
                                        <label
                                            class="file-label"
                                            @click="whichTkanina = 'back'"
                                        >
                                            <input
                                                class="file-input"
                                                type="file"
                                                name="resume"
                                                v-on:change="onTkaninaChange"
                                            />
                                            <span class="file-cta">
                                                <span class="file-icon">
                                                    <i
                                                        class="fas fa-upload"
                                                    ></i>
                                                </span>
                                                <span class="file-label"
                                                    >Wybierz zdjęcie...</span
                                                >
                                            </span>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <figure class="image kroj-image">
                                        <img
                                            :src="
                                                tkaniny[choosedTkanina]
                                                    .single_addon_url
                                            "
                                            alt="Material icon"
                                        />
                                    </figure>
                                </td>
                                <td>Pasek</td>
                                <td class="update-controls">
                                    <div class="file has-name">
                                        <label
                                            class="file-label"
                                            @click="
                                                whichTkanina = 'single_addon'
                                            "
                                        >
                                            <input
                                                class="file-input"
                                                type="file"
                                                name="resume"
                                                v-on:change="onTkaninaChange"
                                            />
                                            <span class="file-cta">
                                                <span class="file-icon">
                                                    <i
                                                        class="fas fa-upload"
                                                    ></i>
                                                </span>
                                                <span class="file-label"
                                                    >Wybierz zdjęcie...</span
                                                >
                                            </span>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <figure class="image kroj-image">
                                        <img
                                            :src="
                                                tkaniny[choosedTkanina]
                                                    .addon_with_collar_url
                                            "
                                            alt="Material icon"
                                        />
                                    </figure>
                                </td>
                                <td>Pasek z kołnierzem</td>
                                <td class="update-controls">
                                    <div class="file has-name">
                                        <label
                                            class="file-label"
                                            @click="
                                                whichTkanina = 'collar_addon'
                                            "
                                        >
                                            <input
                                                class="file-input"
                                                type="file"
                                                name="resume"
                                                v-on:change="onTkaninaChange"
                                            />
                                            <span class="file-cta">
                                                <span class="file-icon">
                                                    <i
                                                        class="fas fa-upload"
                                                    ></i>
                                                </span>
                                                <span class="file-label"
                                                    >Wybierz zdjęcie...</span
                                                >
                                            </span>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <input
                        class="input"
                        type="tel"
                        placeholder="Ilość"
                        v-model="tkaniny[choosedTkanina].quantity"
                    />
                    <div class="control">
                        <button
                            class="button is-primary"
                            @click="updateTkaninaAmount()"
                        >
                            Zapisz
                        </button>
                    </div>
                </div>
                <button
                    class="modal-close is-large"
                    aria-label="close"
                    @click="showTkaninaModal = false"
                ></button>
            </div>
        </section>

        <!--------------------------------- 
             PODSZEWKI 
    ----------------------------------->

        <section class="hero is-info welcome is-small podszewki-section">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">Podszewki</h1>
                    <h2 class="subtitle">Edytuj podszewki kamizelek</h2>
                </div>
            </div>
        </section>
        <section class="kroje-edit">
            <table class="table is-fullwidth">
                <thead>
                    <tr>
                        <th>Podszewka</th>
                        <th>Nazwa</th>
                        <th>Ilość</th>
                        <th>Akcja</th>
                    </tr>
                </thead>
                <tbody v-if="podszewkiReady">
                    <tr v-for="(podszewka, index) in podszewki" :key="index">
                        <td>
                            <figure class="image kroj-image">
                                <img
                                    :src="podszewka.icon_url"
                                    alt="Material image"
                                />
                            </figure>
                        </td>
                        <td>{{ podszewka.name }}</td>
                        <td>{{ podszewka.quantity }}</td>
                        <td>
                            <p class="buttons">
                                <a
                                    class="button is-info"
                                    @click="
                                        showPodszewkaModal = true;
                                        choosedPodszewka = index;
                                    "
                                >
                                    <span class="icon is-small">
                                        <i class="far fa-edit"></i>
                                    </span>
                                    <span>Edytuj</span>
                                </a>
                                <a
                                    class="button is-danger is-outlined"
                                    @click="deletePodszewka(index)"
                                >
                                    <span>Usuń</span>
                                    <span class="icon is-small">
                                        <i class="fas fa-times"></i>
                                    </span>
                                </a>
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="add-podszewki-section">
                <div class="control">
                    <button
                        class="button is-primary"
                        @click="
                            showAddPodszewkaModal = true;
                            newPodszewkaAmount = 0;
                        "
                    >
                        Dodaj nową podszewkę
                    </button>
                </div>
            </div>
            <!--------------------------------- 
                ADD PODSZEWKA MODAL
      ----------------------------------->
            <div class="modal" :class="{ 'is-active': showAddPodszewkaModal }">
                <div class="loader-wrapper" v-if="isLoading">
                    <pulse-loader
                        :loading="true"
                        :color="'#219CEE'"
                        :size="'32px'"
                    ></pulse-loader>
                </div>
                <div
                    class="modal-background"
                    @click="showAddPodszewkaModal = false"
                ></div>
                <div class="modal-content">
                    <table class="table is-fullwidth">
                        <thead>
                            <tr>
                                <th>Opis</th>
                                <th>Akcja</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Ikona</td>
                                <td class="update-controls">
                                    <div class="file has-name">
                                        <label
                                            class="file-label"
                                            @click="whichPodszewka = 'icon'"
                                        >
                                            <input
                                                class="file-input"
                                                type="file"
                                                name="resume"
                                                v-on:change="onPodszewkaChange"
                                            />
                                            <span class="file-cta">
                                                <span class="file-icon">
                                                    <i
                                                        class="fas fa-upload"
                                                    ></i>
                                                </span>
                                                <span class="file-label"
                                                    >Dodaj zdjęcie...</span
                                                >
                                            </span>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Przód</td>
                                <td class="update-controls">
                                    <div class="file has-name">
                                        <label
                                            class="file-label"
                                            @click="whichPodszewka = 'front'"
                                        >
                                            <input
                                                class="file-input"
                                                type="file"
                                                name="resume"
                                                v-on:change="onPodszewkaChange"
                                            />
                                            <span class="file-cta">
                                                <span class="file-icon">
                                                    <i
                                                        class="fas fa-upload"
                                                    ></i>
                                                </span>
                                                <span class="file-label"
                                                    >Dodaj zdjęcie...</span
                                                >
                                            </span>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Tył</td>
                                <td class="update-controls">
                                    <div class="file has-name">
                                        <label
                                            class="file-label"
                                            @click="whichPodszewka = 'back'"
                                        >
                                            <input
                                                class="file-input"
                                                type="file"
                                                name="resume"
                                                v-on:change="onPodszewkaChange"
                                            />
                                            <span class="file-cta">
                                                <span class="file-icon">
                                                    <i
                                                        class="fas fa-upload"
                                                    ></i>
                                                </span>
                                                <span class="file-label"
                                                    >Dodaj zdjęcie...</span
                                                >
                                            </span>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Tył damski</td>
                                <td class="update-controls">
                                    <div class="file has-name">
                                        <label
                                            class="file-label"
                                            @click="
                                                whichPodszewka = 'back_female'
                                            "
                                        >
                                            <input
                                                class="file-input"
                                                type="file"
                                                name="resume"
                                                v-on:change="onPodszewkaChange"
                                            />
                                            <span class="file-cta">
                                                <span class="file-icon">
                                                    <i
                                                        class="fas fa-upload"
                                                    ></i>
                                                </span>
                                                <span class="file-label"
                                                    >Dodaj zdjęcie...</span
                                                >
                                            </span>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <input
                        class="input"
                        type="tel"
                        placeholder="Ilość"
                        v-model="newPodszewkaAmount"
                    />
                    <div class="control">
                        <button
                            class="button is-primary"
                            @click="addPodszewkaAmount()"
                        >
                            Zapisz
                        </button>
                    </div>
                </div>
                <button
                    class="modal-close is-large"
                    aria-label="close"
                    @click="showAddPodszewkaModal = false"
                ></button>
            </div>
            <!--------------------------------- 
                EDIT PODSZEWKA MODAL 
      ----------------------------------->
            <div
                class="modal"
                :class="{ 'is-active': showPodszewkaModal }"
                v-if="podszewkiReady && podszewki.length > 0"
            >
                <div class="loader-wrapper" v-if="isLoading">
                    <pulse-loader
                        :loading="true"
                        :color="'#219CEE'"
                        :size="'32px'"
                    ></pulse-loader>
                </div>
                <div
                    class="modal-background"
                    @click="showPodszewkaModal = false"
                ></div>
                <div class="modal-content">
                    <table class="table is-fullwidth">
                        <thead>
                            <tr>
                                <th>Zdjęcie</th>
                                <th>Opis</th>
                                <th>Akcja</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <figure class="image kroj-image">
                                        <img
                                            :src="
                                                podszewki[choosedPodszewka]
                                                    .icon_url
                                            "
                                            alt="Material icon"
                                        />
                                    </figure>
                                </td>
                                <td>Ikona</td>
                                <td class="update-controls">
                                    <div class="file has-name">
                                        <label
                                            class="file-label"
                                            @click="whichPodszewka = 'icon'"
                                        >
                                            <input
                                                class="file-input"
                                                type="file"
                                                name="resume"
                                                v-on:change="onPodszewkaChange"
                                            />
                                            <span class="file-cta">
                                                <span class="file-icon">
                                                    <i
                                                        class="fas fa-upload"
                                                    ></i>
                                                </span>
                                                <span class="file-label"
                                                    >Wybierz zdjęcie...</span
                                                >
                                            </span>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <figure class="image kroj-image">
                                        <img
                                            :src="
                                                podszewki[choosedPodszewka]
                                                    .image_url
                                            "
                                            alt="Material icon"
                                        />
                                    </figure>
                                </td>
                                <td>Przód</td>
                                <td class="update-controls">
                                    <div class="file has-name">
                                        <label
                                            class="file-label"
                                            @click="whichPodszewka = 'front'"
                                        >
                                            <input
                                                class="file-input"
                                                type="file"
                                                name="resume"
                                                v-on:change="onPodszewkaChange"
                                            />
                                            <span class="file-cta">
                                                <span class="file-icon">
                                                    <i
                                                        class="fas fa-upload"
                                                    ></i>
                                                </span>
                                                <span class="file-label"
                                                    >Wybierz zdjęcie...</span
                                                >
                                            </span>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <figure class="image kroj-image">
                                        <img
                                            :src="
                                                podszewki[choosedPodszewka]
                                                    .back_image_url
                                            "
                                            alt="Material icon"
                                        />
                                    </figure>
                                </td>
                                <td>Tył</td>
                                <td class="update-controls">
                                    <div class="file has-name">
                                        <label
                                            class="file-label"
                                            @click="whichPodszewka = 'back'"
                                        >
                                            <input
                                                class="file-input"
                                                type="file"
                                                name="resume"
                                                v-on:change="onPodszewkaChange"
                                            />
                                            <span class="file-cta">
                                                <span class="file-icon">
                                                    <i
                                                        class="fas fa-upload"
                                                    ></i>
                                                </span>
                                                <span class="file-label"
                                                    >Wybierz zdjęcie...</span
                                                >
                                            </span>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <figure class="image kroj-image">
                                        <img
                                            :src="
                                                podszewki[choosedPodszewka]
                                                    .back_female_image_url
                                            "
                                            alt="Material icon"
                                        />
                                    </figure>
                                </td>
                                <td>Tył damski</td>
                                <td class="update-controls">
                                    <div class="file has-name">
                                        <label
                                            class="file-label"
                                            @click="
                                                whichPodszewka = 'back_female'
                                            "
                                        >
                                            <input
                                                class="file-input"
                                                type="file"
                                                name="resume"
                                                v-on:change="onPodszewkaChange"
                                            />
                                            <span class="file-cta">
                                                <span class="file-icon">
                                                    <i
                                                        class="fas fa-upload"
                                                    ></i>
                                                </span>
                                                <span class="file-label"
                                                    >Wybierz zdjęcie...</span
                                                >
                                            </span>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <input
                        class="input"
                        type="tel"
                        placeholder="Ilość"
                        v-model="podszewki[choosedPodszewka].quantity"
                    />
                    <div class="control">
                        <button
                            class="button is-primary"
                            @click="updatePodszewkaAmount()"
                        >
                            Zapisz
                        </button>
                    </div>
                </div>
                <button
                    class="modal-close is-large"
                    aria-label="close"
                    @click="showPodszewkaModal = false"
                ></button>
            </div>
        </section>
        <!--------------------------------- 
             GUZIKI 
    ----------------------------------->

        <section class="hero is-info welcome is-small guziki-section">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">Guziki</h1>
                    <h2 class="subtitle">Edytuj guziki kamizelek</h2>
                </div>
            </div>
        </section>
        <section class="kroje-edit">
            <table class="table is-fullwidth">
                <thead>
                    <tr>
                        <th>Guziki</th>
                        <th>Nazwa</th>
                        <th>Rodzaj</th>
                        <th>Akcja</th>
                    </tr>
                </thead>
                <tbody v-if="guzikiReady">
                    <tr v-for="(guzik, index) in guziki" :key="index">
                        <td>
                            <figure class="image kroj-image">
                                <img
                                    :src="guzik.icon_url"
                                    alt="Material image"
                                />
                            </figure>
                        </td>
                        <td>{{ guzik.name }}</td>
                        <td>{{ female(guzik) }}</td>
                        <td>
                            <p class="buttons">
                                <a
                                    class="button is-info"
                                    @click="
                                        showGuzikiModal = true;
                                        choosedGuziki = index;
                                    "
                                >
                                    <span class="icon is-small">
                                        <i class="far fa-edit"></i>
                                    </span>
                                    <span>Edytuj</span>
                                </a>
                                <a
                                    class="button is-danger is-outlined"
                                    @click="deleteGuziki(index)"
                                >
                                    <span>Usuń</span>
                                    <span class="icon is-small">
                                        <i class="fas fa-times"></i>
                                    </span>
                                </a>
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="add-guziki-section">
                <div class="control">
                    <button
                        class="button is-primary"
                        @click="showAddGuzikiModal = true"
                    >
                        Dodaj nowe guziki
                    </button>
                </div>
            </div>
            <!--------------------------------- 
                ADD GUZIKI MODAL
      ----------------------------------->
            <div class="modal" :class="{ 'is-active': showAddGuzikiModal }">
                <div class="loader-wrapper" v-if="isLoading">
                    <pulse-loader
                        :loading="true"
                        :color="'#219CEE'"
                        :size="'32px'"
                    ></pulse-loader>
                </div>
                <div
                    class="modal-background"
                    @click="showAddGuzikiModal = false"
                ></div>
                <div class="modal-content">
                    <table class="table is-fullwidth">
                        <thead>
                            <tr>
                                <th>Opis</th>
                                <th>Akcja</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Damskie</td>
                                <td>
                                    <label class="checkbox">
                                        <input
                                            type="checkbox"
                                            v-model="femaleGuziki"
                                        />
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td>Ikona</td>
                                <td class="update-controls">
                                    <div class="file has-name">
                                        <label
                                            class="file-label"
                                            @click="whichGuziki = 'icon'"
                                        >
                                            <input
                                                class="file-input"
                                                type="file"
                                                name="resume"
                                                v-on:change="onGuzikiChange"
                                            />
                                            <span class="file-cta">
                                                <span class="file-icon">
                                                    <i
                                                        class="fas fa-upload"
                                                    ></i>
                                                </span>
                                                <span class="file-label"
                                                    >Dodaj zdjęcie...</span
                                                >
                                            </span>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                            <tr v-for="(kroj, index) in kroje" :key="index">
                                <td v-if="femaleGuziki == kroj.female">
                                    Guziki ({{ kroj.name }} krój)
                                </td>
                                <td
                                    v-if="femaleGuziki == kroj.female"
                                    class="update-controls"
                                >
                                    <div class="file has-name">
                                        <label
                                            class="file-label"
                                            @click="
                                                whichGuziki = String(kroj.name)
                                            "
                                        >
                                            <input
                                                class="file-input"
                                                type="file"
                                                name="resume"
                                                v-on:change="onGuzikiChange"
                                            />
                                            <span class="file-cta">
                                                <span class="file-icon">
                                                    <i
                                                        class="fas fa-upload"
                                                    ></i>
                                                </span>
                                                <span class="file-label"
                                                    >Dodaj zdjęcie...</span
                                                >
                                            </span>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="control">
                        <button class="button is-primary" @click="addGuziki()">
                            Zapisz
                        </button>
                    </div>
                </div>
                <button
                    class="modal-close is-large"
                    aria-label="close"
                    @click="showAddGuzikiModal = false"
                ></button>
            </div>
            <!--------------------------------- 
                EDIT GUZIKI MODAL 
      ----------------------------------->
            <div
                class="modal"
                :class="{ 'is-active': showGuzikiModal }"
                v-if="guzikiReady && guziki.length > 0"
            >
                <div class="loader-wrapper" v-if="isLoading">
                    <pulse-loader
                        :loading="true"
                        :color="'#219CEE'"
                        :size="'32px'"
                    ></pulse-loader>
                </div>
                <div
                    class="modal-background"
                    @click="showGuzikiModal = false"
                ></div>
                <div class="modal-content">
                    <table class="table is-fullwidth">
                        <thead>
                            <tr>
                                <th>Zdjęcie</th>
                                <th>Opis</th>
                                <th>Akcja</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>{{ female(guziki[choosedGuziki]) }}</td>
                            </tr>
                            <tr>
                                <td>
                                    <figure class="image kroj-image">
                                        <img
                                            :src="
                                                guziki[choosedGuziki].icon_url
                                            "
                                            alt="Material icon"
                                        />
                                    </figure>
                                </td>
                                <td>Ikona</td>
                                <td class="update-controls">
                                    <div class="file has-name">
                                        <label
                                            class="file-label"
                                            @click="whichGuziki = 'icon'"
                                        >
                                            <input
                                                class="file-input"
                                                type="file"
                                                name="resume"
                                                v-on:change="onGuzikiChange"
                                            />
                                            <span class="file-cta">
                                                <span class="file-icon">
                                                    <i
                                                        class="fas fa-upload"
                                                    ></i>
                                                </span>
                                                <span class="file-label"
                                                    >Wybierz zdjęcie...</span
                                                >
                                            </span>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                            <tr v-for="(kroj, index) in kroje" :key="index">
                                <td
                                    v-if="
                                        kroj.female ==
                                            guziki[choosedGuziki].female
                                    "
                                >
                                    <figure class="image kroj-image">
                                        <img
                                            v-if="
                                                guziki[choosedGuziki].female ==
                                                    1
                                            "
                                            :src="
                                                '/images/creator/female/' +
                                                    kroj.name +
                                                    '/' +
                                                    guziki[choosedGuziki].name +
                                                    '.png'
                                            "
                                            alt="Material icon"
                                        />
                                        <img
                                            v-if="
                                                guziki[choosedGuziki].female ==
                                                    0
                                            "
                                            :src="
                                                '/images/creator/' +
                                                    kroj.name +
                                                    '/' +
                                                    guziki[choosedGuziki].name +
                                                    '.png'
                                            "
                                            alt="Material icon"
                                        />
                                    </figure>
                                </td>
                                <td
                                    v-if="
                                        kroj.female ==
                                            guziki[choosedGuziki].female
                                    "
                                >
                                    Guziki ({{ kroj.name }} krój)
                                </td>
                                <td
                                    v-if="
                                        kroj.female ==
                                            guziki[choosedGuziki].female
                                    "
                                    class="update-controls"
                                >
                                    <div class="file has-name">
                                        <label
                                            class="file-label"
                                            @click="
                                                whichGuziki = String(kroj.name)
                                            "
                                        >
                                            <input
                                                class="file-input"
                                                type="file"
                                                name="resume"
                                                v-on:change="onGuzikiChange"
                                            />
                                            <span class="file-cta">
                                                <span class="file-icon">
                                                    <i
                                                        class="fas fa-upload"
                                                    ></i>
                                                </span>
                                                <span class="file-label"
                                                    >Wybierz zdjęcie...</span
                                                >
                                            </span>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button
                    class="modal-close is-large"
                    aria-label="close"
                    @click="showGuzikiModal = false"
                ></button>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isLoading: false,
            kroje: [],
            krojeReady: false,
            krojImage: null,
            hasCollar: false,
            forFemale: false,

            tkaniny: [],
            tkaninyReady: false,
            showTkaninaModal: false,
            showAddTkaninaModal: false,
            choosedTkanina: 0,
            choosedTkaninaImage: null,
            newTkaninaAmount: 0,
            whichTkanina: null,
            femaleTkanina: false,

            podszewki: [],
            podszewkiReady: false,
            showPodszewkaModal: false,
            showAddPodszewkaModal: false,
            choosedPodszewka: 0,
            choosedPodszewkaImage: null,
            newPodszewkaAmount: 0,
            whichPodszewka: null,

            guziki: [],
            guzikiReady: false,
            showGuzikiModal: false,
            showAddGuzikiModal: false,
            choosedGuziki: 0,
            choosedGuzikiImage: null,
            whichGuziki: null,
            femaleGuziki: false
        };
    },
    methods: {
        onKrojChange(e) {
            this.krojImage = e.target.files;
        },
        addNewKroj() {
            var krojName = 0;
            if (this.kroje.length == 0) {
                krojName = "1";
            } else {
                krojName = String(this.kroje.length + 1);
            }

            const config = {
                headers: { "content-type": "multipart/form-data" }
            };
            console.log(this.forFemale);
            let formData = new FormData();
            formData.append("name", krojName);
            formData.append("has_collar", this.hasCollar);
            formData.append("female", this.forFemale ? 1 : 0);
            formData.append("image", this.krojImage[0]);

            axios
                .post("/kroj", formData, config)
                .then(response => {
                    if (response.data == "success") {
                        axios.get("/kroj").then(response => {
                            this.kroje = response.data;
                        });
                    }
                })
                .catch(error => {
                    alert("Wystąpił błąd " + error);
                });
        },
        onTkaninaChange(e) {
            this.choosedTkaninaImage = e.target.files;
            var tkaninaName = "";
            var female = 0;
            if (this.showAddTkaninaModal) {
                if (this.tkaniny.length == 0) {
                    tkaninaName = "t1";
                } else {
                    tkaninaName = "t" + String(this.tkaniny.length + 1);
                }
                female = this.femaleTkanina ? 1 : 0;
            } else {
                tkaninaName = this.tkaniny[this.choosedTkanina].name;
                female = this.tkaniny[this.choosedTkanina].female;
            }
            const config = {
                headers: { "content-type": "multipart/form-data" }
            };
            let formData = new FormData();
            formData.append("name", tkaninaName);
            formData.append("image", this.choosedTkaninaImage[0]);
            formData.append("female", female);
            this.isLoading = true;
            axios
                .post("tkanina/image/" + this.whichTkanina, formData, config)
                .then(response => {
                    if (response.data == "success") {
                        axios.get("tkanina").then(response => {
                            this.tkaniny = response.data;
                            this.tkaninyReady = true;
                        });
                        this.isLoading = false;
                    }
                })
                .catch(error => {
                    this.isLoading = false;
                    alert("Wystąpił błąd: " + error);
                });
        },
        updateTkaninaAmount() {
            var id = this.tkaniny[this.choosedTkanina].id;
            axios
                .put("/tkanina/" + id, {
                    quantity: this.tkaniny[this.choosedTkanina].quantity
                })
                .then(response => {
                    alert("Zaktualizowano pomyślnie");
                })
                .catch(error => {
                    alert("Wystąpił błąd: " + error);
                });
        },
        addTkaninaAmount() {
            if (this.newTkaninaAmount == 0) {
                alert("Podaj ilość");
                return;
            }

            var tkaninaName = 0;
            if (this.tkaniny.length == 0) {
                tkaninaName = "t1";
            } else {
                tkaninaName = "t" + String(this.tkaniny.length + 1);
            }
            var imgPath = "";
            if (this.femaleTkanina) {
                imgPath = "/images/creator/female/";
            } else {
                imgPath = "/images/creator/";
            }
            axios
                .post("tkanina", {
                    name: String(tkaninaName),
                    quantity: String(this.newTkaninaAmount),
                    icon_url: imgPath + tkaninaName + ".jpg",
                    back_image_url: imgPath + tkaninaName + "t.png",
                    single_addon_url: imgPath + tkaninaName + "s.png",
                    addon_with_collar_url: imgPath + tkaninaName + "k.png",
                    female: this.femaleTkanina ? 1 : 0
                })
                .then(response => {
                    if (response.data == "success") {
                        alert("Pomyślnie dodano nową tkaninę");
                        this.showAddTkaninaModal = false;
                        axios.get("tkanina").then(response => {
                            this.tkaniny = response.data;
                            this.tkaninyReady = true;
                        });
                    }
                })
                .catch(error => {
                    alert("Wystąpił błąd: " + error);
                });
        },
        onPodszewkaChange(e) {
            this.choosedPodszewkaImage = e.target.files;
            let podszewkaName = "";
            if (this.showAddPodszewkaModal) {
                if (this.podszewki.length == 0) {
                    podszewkaName = "p1";
                } else {
                    podszewkaName = this.generateFleeceName();
                }
            } else {
                podszewkaName = this.podszewki[this.choosedPodszewka].name;
            }
            const config = {
                headers: { "content-type": "multipart/form-data" }
            };
            let formData = new FormData();
            formData.append("name", podszewkaName);
            formData.append("image", this.choosedPodszewkaImage[0]);
            this.isLoading = true;
            axios
                .post(
                    "podszewka/image/" + this.whichPodszewka,
                    formData,
                    config
                )
                .then(response => {
                    if (response.data == "success") {
                        this.isLoading = false;
                    }
                })
                .catch(error => {
                    this.isLoading = false;
                    alert("Wystąpił błąd: " + error);
                });
        },
        generateFleeceName() {
            let highestNumber = 0;
            for (let i = 0; i < this.podszewki.length; i++) {
                const fleeceNumber = Number(
                    this.podszewki[i].name.replace("p", "")
                );
                if (fleeceNumber > highestNumber) {
                    highestNumber = fleeceNumber;
                }
            }

            console.log(highestNumber, `p${highestNumber + 1}`);
            return `p${highestNumber + 1}`;
        },
        updatePodszewkaAmount() {
            var id = this.podszewki[this.choosedPodszewka].id;
            axios
                .put("/podszewka/" + String(id), {
                    quantity: this.podszewki[this.choosedPodszewka].quantity
                })
                .then(response => {
                    alert("Zaktualizowano pomyślnie");
                })
                .catch(error => {
                    alert("Wystąpił błąd: " + error);
                });
        },
        addPodszewkaAmount() {
            if (this.newPodszewkaAmount == 0) {
                alert("Podaj ilość");
                return;
            }

            var podszewkaName = "";
            if (this.podszewki.length == 0) {
                podszewkaName = "p1";
            } else {
                podszewkaName = "p" + String(this.podszewki.length + 1);
            }
            axios
                .post("podszewka", {
                    name: String(podszewkaName),
                    quantity: String(this.newPodszewkaAmount),
                    icon_url: "/images/creator/" + podszewkaName + ".jpg",
                    back_image_url:
                        "/images/creator/" + podszewkaName + "p.png",
                    image_url: "/images/creator/" + podszewkaName + ".png",
                    back_female_image_url:
                        "/images/creator/female/" + podszewkaName + ".png"
                })
                .then(response => {
                    if (response.data == "success") {
                        alert("Pomyślnie dodano nową podszewkę");
                        this.showAddPodszewkaModal = false;
                        axios.get("podszewka").then(response => {
                            this.podszewki = response.data;
                            this.podszewkiReady = true;
                        });
                    }
                })
                .catch(error => {
                    alert("Wystąpił błąd: " + error);
                });
        },
        onGuzikiChange(e) {
            this.choosedGuzikiImage = e.target.files;
            var guzikiName = "";
            var female = 0;
            if (this.showAddGuzikiModal) {
                if (this.guziki.length == 0) {
                    guzikiName = "g1";
                } else {
                    guzikiName = "g" + String(this.guziki.length + 1);
                }
                female = this.femaleGuziki ? 1 : 0;
            } else {
                guzikiName = this.guziki[this.choosedGuziki].name;
                female = this.guziki[this.choosedGuziki].female;
            }
            const config = {
                headers: { "content-type": "multipart/form-data" }
            };
            let formData = new FormData();
            formData.append("name", guzikiName);
            formData.append("image", this.choosedGuzikiImage[0]);
            formData.append("female", female);
            this.isLoading = true;
            axios
                .post("button/image/" + this.whichGuziki, formData, config)
                .then(response => {
                    if (response.data == "success") {
                        axios.get("button").then(response => {
                            this.guziki = response.data;
                            this.guzikiReady = true;
                        });
                        this.isLoading = false;
                    }
                })
                .catch(error => {
                    alert("Wystąpił błąd: " + error);
                });
        },
        addGuziki() {
            var guzikiName = 0;
            var imgPath = "";
            if (this.guziki.length == 0) {
                guzikiName = "g1";
            } else {
                guzikiName = "g" + String(this.guziki.length + 1);
            }

            if (this.femaleGuziki) {
                imgPath = "/images/creator/female/";
            } else {
                imgPath = "/images/creator/";
            }
            axios
                .post("button", {
                    name: String(guzikiName),
                    icon_url: imgPath + guzikiName + ".jpg",
                    female: this.femaleGuziki
                })
                .then(response => {
                    if (response.data == "success") {
                        alert("Pomyślnie dodano nowe guziki");
                        this.showAddGuzikiModal = false;
                        axios.get("button").then(response => {
                            this.guziki = response.data;
                            this.guzikiReady = true;
                        });
                    }
                })
                .catch(error => {
                    alert("Wystąpił błąd: " + error);
                });
        },
        deleteTkanina(index) {
            var id = this.tkaniny[index].id;
            axios.post("tkanina/delete/" + id).then(response => {
                this.tkaniny.splice(index, 1);
            });
        },
        deleteKroj(index) {
            var id = this.kroje[index].id;
            axios.post("kroj/delete/" + id).then(response => {
                this.kroje.splice(index, 1);
                for (var i = 0; i < this.kroje.length; i++) {
                    var oldName = this.kroje[i].name;
                    this.kroje[i].name = String(i + 1);
                    axios
                        .put("/kroj/" + String(this.kroje[i].id), {
                            oldName: String(oldName),
                            name: String(i + 1)
                        })
                        .catch(error => {
                            alert("Wystąpił błąd: " + error);
                        });
                }
            });
        },
        deletePodszewka(index) {
            var id = this.podszewki[index].id;
            axios
                .delete("/podszewka/" + String(id))
                .then(response => {
                    this.podszewki.splice(index, 1);
                })
                .catch(error => {
                    alert("Wystapił błąd: " + error);
                });
        },
        deleteGuziki(index) {
            var id = this.guziki[index].id;
            axios
                .delete("/button/" + String(id))
                .then(response => {
                    this.guziki.splice(index, 1);
                })
                .catch(error => {
                    alert("Wystapił błąd: " + error);
                });
        },
        collar(kroj) {
            if (kroj.has_collar == "true") {
                return "tak";
            } else {
                return "nie";
            }
        },
        female(kroj) {
            if (kroj.female == 0) {
                return "męski";
            } else {
                return "damski";
            }
        }
    },
    created() {
        axios.get("kroj").then(response => {
            this.kroje = response.data;
            if (this.kroje.length != 0) {
                this.krojeReady = true;
            }
        });
        axios.get("tkanina").then(response => {
            this.tkaniny = response.data;
            if (this.tkaniny.length != 0) {
                this.tkaninyReady = true;
            }
        });
        axios.get("podszewka").then(response => {
            this.podszewki = response.data;
            if (this.podszewki.length != 0) {
                this.podszewkiReady = true;
            }
        });
        axios.get("button").then(response => {
            this.guziki = response.data;
            if (this.guziki.length != 0) {
                this.guzikiReady = true;
            }
        });
    }
};
</script>

<style lang="scss">
.add-section {
    margin-bottom: 30px;
    margin-top: 20px;
    display: flex;
    align-items: center;
}
.add-section > .control,
.add-section > label {
    margin-left: 10px;
}
.kroj-image {
    max-width: 64px;
}

.update-controls {
    display: flex;
}
.update-controls > .control {
    margin-left: 10px;
}
.add-tkanina-section {
    margin: 20px 0 30px 0;
}

.podszewki-section {
    margin-top: 30px;
}

.guziki-section {
    margin-top: 30px;
}
.loader-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
