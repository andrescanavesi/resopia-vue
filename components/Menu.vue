<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <nuxt-link class="navbar-brand" to="/">
      Recipes21
    </nuxt-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>

    <div id="navbarSupportedContent" class="collapse navbar-collapse">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <nuxt-link class="nav-link" to="/">
            Home <span class="sr-only">(current)</span>
          </nuxt-link>
        </li>
        <li class="nav-item d-none">
          <nuxt-link class="nav-link" to="/categories">
            Categories
          </nuxt-link>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0 d-none">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
    </div>
  </nav>
</template>
