import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
export type links = {
    url?: string;
    label?: string;
    active?: boolean;
};
type Meta = {
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        links: links[];
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
    select: (value: string) => void;
};
const ConditionalRendering = (condition: boolean, template: React.ReactNode, icon: React.ReactNode) => {
    console.log();
    if (!condition) {
        return template;
    }
    return (
        <Button variant="outline" size="icon" className="hidden size-8 lg:flex" disabled={true}>
            <span className="sr-only">Go to previous page</span>
            {icon}
        </Button>
    );
};
export function DataTablePagination({ meta, select }: Meta) {
    // console.log(meta);
    return (
        <div className="flex items-center justify-between px-2">
            <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">Rows per page</p>
                    <Select value={`${meta.per_page}`} onValueChange={select}>
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={meta.per_page} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 20, 25, 30, 40, 50].map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    Page {meta.current_page} of {meta.last_page}
                </div>

                <div className="flex items-center space-x-2">
                    {ConditionalRendering(
                        !meta.links[0].url,
                        <Link href={meta.links[1].url ?? ''} className="hidden size-8 lg:flex">
                            <Button variant="outline" size="icon" className="hidden size-8 lg:flex">
                                <span className="sr-only">Go to first page</span>
                                <ChevronsLeft />
                            </Button>
                        </Link>,
                        <ChevronsLeft />,
                    )}
                    {/* //first page */}
                    {ConditionalRendering(
                        !meta.links[meta.current_page - 1].url,
                        <Link href={meta.links[meta.current_page - 1].url ?? ''} className="hidden size-8 lg:flex">
                            <Button variant="outline" size="icon" className="hidden size-8 lg:flex">
                                <span className="sr-only">Go to previous page</span>
                                <ChevronLeft />
                            </Button>
                        </Link>,
                        <ChevronLeft />,
                    )}
                    {/* prev */}
                    {meta.links.map((item, index) => {
                        if (index == 0 || index == meta.links.length - 1) return null;
                        return (
                            <Link key={index} href={item.url ?? ''} className="hidden size-8 lg:flex">
                                <Button variant="outline" size="icon" className="hidden size-8 lg:flex">
                                    {item.label}
                                </Button>
                            </Link>
                        );
                    })}
                    {/* //number */}
                    {ConditionalRendering(
                        !meta.links[meta.current_page + 1].url,
                        <Link href={meta.links[meta.current_page + 1].url ?? ''} className="hidden size-8 lg:flex">
                            <Button variant="outline" size="icon" className="hidden size-8 lg:flex">
                                <span className="sr-only">Go to Next page</span>
                                <ChevronRight />
                            </Button>
                        </Link>,
                        <ChevronRight />,
                    )}
                    {/* nextpage */}
                    {ConditionalRendering(
                        !meta.links[meta.links.length - 1].url,
                        <Link href={meta.links[meta.links.length - 1].url ?? ''} className="hidden size-8 lg:flex">
                            <Button variant="outline" size="icon" className="hidden size-8 lg:flex">
                                <span className="sr-only">Go to Last page</span>
                                <ChevronsRight />
                            </Button>
                        </Link>,
                        <ChevronsRight />,
                    )}
                    {/*  //last_page */}
                </div>
            </div>
        </div>
    );
}
