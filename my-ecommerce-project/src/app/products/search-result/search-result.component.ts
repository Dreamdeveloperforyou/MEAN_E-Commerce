import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VariantService } from 'src/app/services/variant/variant.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  searchQuery: any;
  searchResult: any = []; 

  constructor(private activateRoute: ActivatedRoute, private variantService: VariantService) { }

  ngOnInit(): void {
    // this.getQueryParam();
    // this.getSearchResult();
    console.log('query', this.searchQuery);
  }

  getQueryParam() {
    this.activateRoute.queryParams.subscribe((params) => {
      this.searchQuery = params['searchQuery'];
    });
  }


  // getSearchResult() {
  //   this.variantService.searchVariant({ searchQuery: this.searchQuery }).subscribe(
  //     (res) => {
  //       this.searchResult = res.data;
  //     }, (error) => {
  //       console.log(error);
  //     }
  //   )
  // }
}
