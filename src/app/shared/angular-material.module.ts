import { NgModule                         } from '@angular/core';
import { ScrollingModule                  } from '@angular/cdk/scrolling';
import { OverlayModule                    } from '@angular/cdk/overlay';
import { BrowserModule                    } from '@angular/platform-browser';
import { BrowserAnimationsModule          } from '@angular/platform-browser/animations';
import { FlexModule                       } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule          } from '@angular/material/core';
import { MatAutocompleteModule    } from '@angular/material/autocomplete';
import { MatBadgeModule           } from '@angular/material/badge';
import { MatButtonModule          } from '@angular/material/button';
import { MatButtonToggleModule    } from '@angular/material/button-toggle';
import { MatCardModule            } from '@angular/material/card';
import { MatCheckboxModule        } from '@angular/material/checkbox';
import { MatChipsModule           } from '@angular/material/chips';
import { MatStepperModule         } from '@angular/material/stepper';
import { MatDatepickerModule      } from '@angular/material/datepicker';
import { MatDialogModule          } from '@angular/material/dialog';
import { MatDividerModule         } from '@angular/material/divider';
import { MatExpansionModule       } from '@angular/material/expansion';
import { MatGridListModule        } from '@angular/material/grid-list';
import { MatIconModule            } from '@angular/material/icon';
import { MatInputModule           } from '@angular/material/input';
import { MatListModule            } from '@angular/material/list';
import { MatMenuModule            } from '@angular/material/menu';
import { MatPaginatorModule       } from '@angular/material/paginator';
import { MatProgressBarModule     } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule           } from '@angular/material/radio';
import { MatSelectModule          } from '@angular/material/select';
import { MatSidenavModule         } from '@angular/material/sidenav';
import { MatSliderModule          } from '@angular/material/slider';
import { MatSlideToggleModule     } from '@angular/material/slide-toggle';
import { MatSnackBarModule        } from '@angular/material/snack-bar';
import { MatSortModule            } from '@angular/material/sort';
import { MatTableModule           } from '@angular/material/table';
import { MatTabsModule            } from '@angular/material/tabs';
import { MatToolbarModule         } from '@angular/material/toolbar';
import { MatTooltipModule         } from '@angular/material/tooltip';
import { MatFormFieldModule       } from '@angular/material/form-field';

@NgModule({
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexModule,
    FormsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    OverlayModule,
    ReactiveFormsModule,
    ScrollingModule
  ]
})
export class AngularMaterialModule {}
