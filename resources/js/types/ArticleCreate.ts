export interface ArtcleInterface {
    order_id?: number;
    location_id?: number;
    ip_assignment_id?: number;
    term?: number;
    number_of_ip?: number;
    upload_bandwidth?: number;
    download_bandwidth?: number;
    ip_address?: string;
    gateway?: string;
    subnet_mask?: string;
    primary_dns?: string;
    secondary_dns?: string;
    pppoe_username?: string;
    pppoe_password?: string;
    is_installed_at_default_location?: number;
    actual_installed_location?: string;
    requested_installed_location?: string;
}


export interface FormAInterface {

          type ?: string,
          link ?: string,
          title ?: string,
          tags ?: object,
          body ?: string,
          category ?: string,
          image ?: string

}

export interface ProductInterface {

          title ?: string,
          media ?: string,
          short_description ?: string,
          long_description ?: string,
          more_media ?: string,
}

