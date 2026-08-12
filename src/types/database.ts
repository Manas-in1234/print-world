export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type Table<
  Row extends Record<string, unknown>,
  Insert extends Record<string, unknown>,
  Update extends Record<string, unknown>,
> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: [];
};

export interface Database {
  public: {
    Tables: {
      categories: Table<
        {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          image: string | null;
          active: boolean;
          created_at: string;
        },
        {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          image?: string | null;
          active?: boolean;
          created_at?: string;
        },
        {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          image?: string | null;
          active?: boolean;
          created_at?: string;
        }
      >;
      products: Table<
        {
          id: string;
          name: string;
          slug: string;
          description: string;
          category_id: string | null;
          category: string;
          base_price: number;
          image: string | null;
          featured: boolean;
          active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        },
        {
          id?: string;
          name: string;
          slug: string;
          description: string;
          category_id?: string | null;
          category: string;
          base_price: number;
          image?: string | null;
          featured?: boolean;
          active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        },
        {
          id?: string;
          name?: string;
          slug?: string;
          description?: string;
          category_id?: string | null;
          category?: string;
          base_price?: number;
          image?: string | null;
          featured?: boolean;
          active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        }
      >;
      product_variants: Table<
        {
          id: string;
          product_id: string;
          name: string;
          variant_type: string;
          price: number;
          active: boolean;
          created_at: string;
        },
        {
          id?: string;
          product_id: string;
          name: string;
          variant_type?: string;
          price: number;
          active?: boolean;
          created_at?: string;
        },
        {
          id?: string;
          product_id?: string;
          name?: string;
          variant_type?: string;
          price?: number;
          active?: boolean;
          created_at?: string;
        }
      >;
      product_shapes: Table<
        {
          id: string;
          product_id: string;
          name: string;
          slug: string;
          shape_type: string;
          preview_image: string | null;
          price_adjustment: number;
          active: boolean;
          sort_order: number;
          created_at: string;
        },
        {
          id?: string;
          product_id: string;
          name: string;
          slug: string;
          shape_type: string;
          preview_image?: string | null;
          price_adjustment?: number;
          active?: boolean;
          sort_order?: number;
          created_at?: string;
        },
        {
          id?: string;
          product_id?: string;
          name?: string;
          slug?: string;
          shape_type?: string;
          preview_image?: string | null;
          price_adjustment?: number;
          active?: boolean;
          sort_order?: number;
          created_at?: string;
        }
      >;
      product_images: Table<
        {
          id: string;
          product_id: string;
          image_url: string;
          alt_text: string | null;
          sort_order: number;
          created_at: string;
        },
        {
          id?: string;
          product_id: string;
          image_url: string;
          alt_text?: string | null;
          sort_order?: number;
          created_at?: string;
        },
        {
          id?: string;
          product_id?: string;
          image_url?: string;
          alt_text?: string | null;
          sort_order?: number;
          created_at?: string;
        }
      >;
      design_templates: Table<
        {
          id: string;
          product_id: string | null;
          name: string;
          slug: string;
          template_data: Json;
          preview_image: string | null;
          active: boolean;
          created_at: string;
          updated_at: string;
        },
        {
          id?: string;
          product_id?: string | null;
          name: string;
          slug: string;
          template_data?: Json;
          preview_image?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        },
        {
          id?: string;
          product_id?: string | null;
          name?: string;
          slug?: string;
          template_data?: Json;
          preview_image?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        }
      >;
      profiles: Table<
        {
          id: string;
          email: string | null;
          full_name: string | null;
          phone: string | null;
          is_admin: boolean;
          created_at: string;
          updated_at: string;
        },
        {
          id: string;
          email?: string | null;
          full_name?: string | null;
          phone?: string | null;
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        },
        {
          id?: string;
          email?: string | null;
          full_name?: string | null;
          phone?: string | null;
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        }
      >;
      saved_designs: Table<
        {
          id: string;
          user_id: string | null;
          product_id: string | null;
          product_slug: string;
          name: string;
          design_data: Json;
          preview_url: string | null;
          original_upload_url: string | null;
          created_at: string;
          updated_at: string;
        },
        {
          id?: string;
          user_id?: string | null;
          product_id?: string | null;
          product_slug: string;
          name?: string;
          design_data?: Json;
          preview_url?: string | null;
          original_upload_url?: string | null;
          created_at?: string;
          updated_at?: string;
        },
        {
          id?: string;
          user_id?: string | null;
          product_id?: string | null;
          product_slug?: string;
          name?: string;
          design_data?: Json;
          preview_url?: string | null;
          original_upload_url?: string | null;
          created_at?: string;
          updated_at?: string;
        }
      >;
      orders: Table<
        {
          id: string;
          user_id: string | null;
          order_number: string;
          status: string;
          customer_name: string;
          customer_email: string;
          customer_phone: string | null;
          shipping_address: Json;
          subtotal: number;
          shipping_cost: number;
          total: number;
          payment_provider: string | null;
          payment_id: string | null;
          payment_status: string | null;
          coupon_code: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        },
        {
          id?: string;
          user_id?: string | null;
          order_number: string;
          status?: string;
          customer_name: string;
          customer_email: string;
          customer_phone?: string | null;
          shipping_address?: Json;
          subtotal?: number;
          shipping_cost?: number;
          total?: number;
          payment_provider?: string | null;
          payment_id?: string | null;
          payment_status?: string | null;
          coupon_code?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        },
        {
          id?: string;
          user_id?: string | null;
          order_number?: string;
          status?: string;
          customer_name?: string;
          customer_email?: string;
          customer_phone?: string | null;
          shipping_address?: Json;
          subtotal?: number;
          shipping_cost?: number;
          total?: number;
          payment_provider?: string | null;
          payment_id?: string | null;
          payment_status?: string | null;
          coupon_code?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        }
      >;
      order_items: Table<
        {
          id: string;
          order_id: string;
          product_id: string | null;
          product_name: string;
          product_slug: string;
          variant_name: string | null;
          shape_name: string | null;
          quantity: number;
          unit_price: number;
          customization_data: Json | null;
          saved_design_id: string | null;
          created_at: string;
        },
        {
          id?: string;
          order_id: string;
          product_id?: string | null;
          product_name: string;
          product_slug: string;
          variant_name?: string | null;
          shape_name?: string | null;
          quantity?: number;
          unit_price: number;
          customization_data?: Json | null;
          saved_design_id?: string | null;
          created_at?: string;
        },
        {
          id?: string;
          order_id?: string;
          product_id?: string | null;
          product_name?: string;
          product_slug?: string;
          variant_name?: string | null;
          shape_name?: string | null;
          quantity?: number;
          unit_price?: number;
          customization_data?: Json | null;
          saved_design_id?: string | null;
          created_at?: string;
        }
      >;
      coupons: Table<
        {
          id: string;
          code: string;
          description: string | null;
          discount_type: string;
          discount_value: number;
          min_order: number | null;
          active: boolean;
          expires_at: string | null;
          created_at: string;
        },
        {
          id?: string;
          code: string;
          description?: string | null;
          discount_type?: string;
          discount_value: number;
          min_order?: number | null;
          active?: boolean;
          expires_at?: string | null;
          created_at?: string;
        },
        {
          id?: string;
          code?: string;
          description?: string | null;
          discount_type?: string;
          discount_value?: number;
          min_order?: number | null;
          active?: boolean;
          expires_at?: string | null;
          created_at?: string;
        }
      >;
      site_settings: Table<
        {
          key: string;
          value: Json;
          updated_at: string;
        },
        {
          key: string;
          value?: Json;
          updated_at?: string;
        },
        {
          key?: string;
          value?: Json;
          updated_at?: string;
        }
      >;
      ai_generations: Table<
        {
          id: string;
          user_id: string | null;
          generation_type: string;
          prompt: string | null;
          result_url: string | null;
          metadata: Json | null;
          created_at: string;
        },
        {
          id?: string;
          user_id?: string | null;
          generation_type: string;
          prompt?: string | null;
          result_url?: string | null;
          metadata?: Json | null;
          created_at?: string;
        },
        {
          id?: string;
          user_id?: string | null;
          generation_type?: string;
          prompt?: string | null;
          result_url?: string | null;
          metadata?: Json | null;
          created_at?: string;
        }
      >;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type DbProduct = Database["public"]["Tables"]["products"]["Row"];
export type DbCategory = Database["public"]["Tables"]["categories"]["Row"];
export type DbProductVariant = Database["public"]["Tables"]["product_variants"]["Row"];
export type DbProductShape = Database["public"]["Tables"]["product_shapes"]["Row"];
export type DbProductImage = Database["public"]["Tables"]["product_images"]["Row"];
export type DbProfile = Database["public"]["Tables"]["profiles"]["Row"];
export type DbOrder = Database["public"]["Tables"]["orders"]["Row"];
export type DbOrderItem = Database["public"]["Tables"]["order_items"]["Row"];
export type DbSavedDesign = Database["public"]["Tables"]["saved_designs"]["Row"];
export type DbCoupon = Database["public"]["Tables"]["coupons"]["Row"];
export type DbAiGeneration = Database["public"]["Tables"]["ai_generations"]["Row"];
